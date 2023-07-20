//check register
const validationRegister = async (req, res, next) => {
    const { phoneNumber, password, name } = req.body;
    if (!phoneNumber || !password || !name) {
        return res.status(400).json({ result: false, message: 'It nhat 6 ki tu' })
    } else {
        let regex = /([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])/;
        // let regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/
        if (!regex.test(phoneNumber)) {
            return res.status(400).json({
                result: false,
                message: 'phoneNumber không hợp lệ'
            });
        }
        regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!regex.test(password)) {
            return res.status(400).json({
                result: false,
                message: 'Mật khẩu phải có ít nhất 8 ký tự, chữ và số'
            });
        }
        return next();
    }
}

// const validationChangePassword = async (req, res, next) => {
//     const { oldPassword, newPassword, reNewPassword } = req.body;
//     if()
// }
module.exports = {
    validationRegister
}