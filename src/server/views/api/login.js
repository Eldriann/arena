const jwt = require('jsonwebtoken');
const sha256 = require('sha256');
const config = require('../../config/index');
const MongoClient = require('mongodb').MongoClient;

const url = `mongodb://${config.authDb.user}:${config.authDb.password}@${config.authDb.host}:${config.authDb.port}/${config.authDb.dbName}`;

async function handler(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const hashedPassword = sha256(sha256(password));

    const client = new MongoClient(url);

    client.connect().then((client) => {
        client.db(config.authDb.dbName).collection('User').findOne({email: username, role: "admin", password: hashedPassword})
            .then((user) => {
                if (user) {
                    req.session.token = jwt.sign({
                        username,
                        role: "admin"
                    }, config.jwt.secret);
                    res.redirect('/');
                } else {
                    res.redirect('/login');
                }
            })
    }).catch((e) => {
        res.redirect('/login');
    });
}

module.exports = handler;
