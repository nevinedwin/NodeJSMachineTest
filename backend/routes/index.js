const userSchema = require('../model/users')
const bcrypt = require('bcrypt');


const router = async (req, res) => {

    // ---------SIGN UP--------------//
    if (req.url == '/signup' && req.method === 'POST') {
        try {
            let body = '';
            let userData;

            // ------------- LISTEN FOR DATA EVENT-----------//
            req.on('data', (chunk) => {
                body += chunk.toString();
            })


            // ----------------LISTEN FOR END EVENT -----------------//
            req.on('end', async () => {

                // ---------CHECK USER ALREADY EXISTS--------------//
                userData = await userSchema.find({ email: JSON.parse(body).email })
                if (userData.length !== 0) {
                    res.writeHead(403, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" });
                    res.end("User Already exists")
                    return;
                }
                // -------------HASHING THE PASSWORD----------------
                let encryptedBody = JSON.parse(body);
                const hash = await bcrypt.hash(encryptedBody.password, 10);
                encryptedBody = {
                    ...encryptedBody,
                    password: hash
                }

                // --------------SAVING DATA TO DB -------------//
                let result = new userSchema(encryptedBody);
                await result.save();
                res.writeHead(200, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" })
                res.end(JSON.stringify(result))
                return;
            })
        } catch (error) {
            console.log(error);
        }
    }

    // -----------LOGIN ------------//
    if (req.url === '/login' && req.method === 'POST') {
        try {

            let body = '';
            let userData;

            // ------------- LISTEN FOR DATA EVENT-----------//
            req.on('data', (chunk) => {
                body += chunk.toString();
            })

            req.on('end', async () => {

                // ---------FETCHING PASSWORD IN DB--------------//
                userData = await userSchema.find({ email: JSON.parse(body).email })

                if (userData.length === 0) {
                    res.writeHead(404, { "Content-Type": "applicaiton/json", "Access-Control-Allow-Origin": "*" });
                    res.end("User is not registered")
                    return
                }

                // -------COMPARING PASSWORDS----------//
                let comparePass = await bcrypt.compare(JSON.parse(body).password, userData[0].password);
                if (comparePass) {
                    res.writeHead(200, { "Content-Type": "appicaiton/json", "Access-Control-Allow-Origin": "*" })
                    res.end(JSON.stringify({
                        isValidUser: true,
                        userEmail: userData[0].email
                    }))
                } else {
                    res.writeHead(401, { "Content-Type": "applicaiton/json", "Access-Control-Allow-Origin": "*" });
                    res.end("Incorrect Password")
                }
            })

        } catch (error) {
            console.log(error);
        }
    }

    // -------------LIST USERS ----------------//
    req_url = req.url.split("?");
    if (req_url[0] === '/list' && req.method === 'GET') {
        // -------FETCHING ALL USERS--------//
        let result = await userSchema.find({})
        res.writeHead(200, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" })
        if (result.length === 0) {
            res.end("No user found")
            return;
        }
        res.end(JSON.stringify({
            data: result
        }))
    }


}


module.exports = router;