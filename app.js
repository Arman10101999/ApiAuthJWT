const express = require("express")
const jwt = require("jsonwebtoken")

//intializing the express 
const app = express();

//welcome page
app.get('/api', (req, res) => {
    res.json({
        message: "Welcome to the API "
    });
});

//create a route that's need to be protected
app.post('/api/posts', verifyToken, (req, res) => {
    res.json({
        message: 'Post Created ...'
    });

});

//get the token so for that we have to create route for that 
//we are doing here in async for sync  we have define a variable there only and the seceret key too.
app.post('/api/login', (req, res) => {
    //Mock user
    const user = {
        id: 1,
        username: 'Arman',
        email: 'arman.bxm@gmail.com'
    }

    jwt.sign({ user: user }, 'secretkey', (err, token) => {
        res.json({
            token //<-- Es6 STYLE token:token
        });
    });
});


//creating verify Token 
//this is the middleware function which taken an extra parameter (next) , whole function will do as say and then call to next
function verifyToken(req, res, next) {
    //GET THE AUTH HEADER  VALUE
    //format of token 
    // authorization : Bearer <access_token>
    const bearerHeader = req.headers['authorization'];
    //checking if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        //split at the space
        const bearer = bearerHeader.split(' ');
        //get token from array
        const bearerToken = bearer[1];
        //set the token 
        req.token = bearerToken;
        //next middleware
        next();

    } else {
        //forbidden
        res.sendStatus(403);
    }

}
app.listen(5000, () => console.log("server started on port 5000"))





//this is just a normal post call api and now we will protect it using Token created.
// app.post('/api/login', (req, res) => {
//     //Mock user
//     const user = {
//         id: 1,
//         username: 'Arman',
//         email: 'arman.bxm@gmail.com'
//     }

//     jwt.sign({ user: user }, 'secretkey', (err, token) => {
//         res.json({
//             token //<-- Es6 STYLE token:token
//         });
//     });
// });