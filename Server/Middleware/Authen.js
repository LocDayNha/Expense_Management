const jwt = require('jsonwebtoken');

//kieem tra token
const checkTokenCpanel = (req, res, next) => {
    const { session } = req;//lay session
    const url = req.originalUrl.toLowerCase(); // lay url

    //neu k co tai nguyen thi chuyen qua trang login
    if (!session) {
        //neu chua co session ma muon qua trang khac thi chhuyeen qua login
        if (url.includes('/login')) {
            return next();
        } else {
            return res.redirect('/login')
        }
    } else {
        const { token } = session;
        if (!token) {
            //neu chua co session ma muon qua trang khac thi chhuyeen qua login
            if (url.includes('/login')) {
                return next();
            } else {
                return res.redirect('/login')
            }
        } else {
            jwt.verify(token, 'secret', (err, decoded) => {
                if (err) {
                    if (url.includes('/login')) {
                        return next();
                    } else {
                        return res.redirect('/login')
                    }
                } else {
                    if (url.includes('/login')) {
                        return res.redirect('/')
                    } else {
                        const { role } = decoded;
                        if (role < 100) {
                            req.session.destroy();
                            return res.redirect('/login')

                        } else {
                            return next();
                        }
                    }
                }
            });
        }
    }
}
const checkTokenApp = (req, res, next) => {
    let token = null;
    if (req.headers.authorization &&
        req.headers.authorization.split(' ')[0] == 'Bearer')
        token = req.headers.authorization.split(' ')[1];

    if (token) {
        jwt.verify(token, 'secret', function (error, decoded) {
            if (error) {
                return res.status(401).json({ status: false })
            } else {
                return next();
            }
        })
    } else {
        return res.status(401).json({ status: false })
    }
}
module.exports = {
    checkTokenCpanel,
    checkTokenApp
}