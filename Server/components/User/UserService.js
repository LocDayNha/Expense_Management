const UserModel = require('./UserModel')
const bcrypt = require('bcryptjs')

//http://localhost:3000/api/user/login
const login = async (email, password) => {
    try {
        const user = await UserModel.findOne({ email: email })
        if (user) {
            const result = bcrypt.compareSync(password, user.password);
            user.isLogin = true;
            return result ? user : false;
        }
    } catch (error) {
        console.log('Login error' + error)
        return false;
    }
}
//http://localhost:3000/api/user/loginGoogle
const loginGoogle = async (email, name, avatar) => {
    try {
        const user = await UserModel.findOne({ email: email })
        if (user) {
            if (user.isActive) {
                user.isLogin = true;
                return user;

            } else {
                return false;
            }
        } else {
            const newUser = { email, name, avatar };
            const u = new UserModel(newUser);
            await u.save();
            user.isLogin = true;
            return newUser;
        }
    } catch (error) {
        console.log('loginGoogle error' + error)
        return false;
    }
}
const getById = async (id) => {
    try {
        const user = await UserModel.findById({ _id: id });
        if (user != null) {
            return user
        } return false
    } catch (error) {
        console.log("Get product by id error " + error);
        return null;
    }
}


//http://localhost:3000/api/user/register
const register = async (email, password, name, description, avatar, role, createAt, updateAt, isLogin, isActive, isVerified, verificationCode, isAble) => {
    try {
        console.log("QQQQ", email, password, name, description, avatar, role, createAt,
            updateAt, isLogin, isActive, isVerified, verificationCode)

        const user = await UserModel.findOne({ email: email })
        console.log("userrrr", user)
        if (user == null) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            const newUser = { email, password: hash, name, description, avatar, role, createAt, updateAt, isLogin, isActive, isVerified, verificationCode, isAble };
            const u = new UserModel(newUser);
            await u.save();
            return true;
            6
        } else {
            return false;
        }
    } catch (error) {
        console.log("Register error" + error)
        return false;
    }
}
const deleteUser = async (email) => {
    try {
        const user = await UserModel.findOne({ email: email })
        console.log(user)
        {
            await UserModel.deleteOne(user)
        }
        return true;
    } catch (error) {
        console.log("Delete User  error", error);
        return false;

    }
}

const updateUser = async (idUser, avatar, name, description, limit) => {
    try {
        const user = await UserModel.findOne({ _id: idUser })
        console.log("sadad", user);
        if (user) {

            user.avatar = avatar ? avatar : user.avatar;
            user.name = name ? name : user.name;
            user.description = description ? description : user.description;
            user.limit = limit ? limit : user.limit;

            await user.save();
            console.log("INFO USER:", user);

            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log("Update User  error", error)
        return false;
    }
}
const search = async (email) => {
    try {
        console.log("aaaaa", email)
        const users = await UserModel.find({ email: { $regex: email } })
        console.log(users)
        return users;
        // const users = await UserModel.find({
        //     $and: [
        //         { name: { $regex: name, $options: 'i' } },
        //         { email: { $regex: email } }
        //     ]
        // })


    } catch (error) {
        return false;
    }
}
const getAllUser = async (page, size) => {
    try {
        // return data;
        return await UserModel.find();
        //  data.splice(index, 1);
    } catch (error) {
        console.log("List user Got an error: ", error);
        throw error;
    }
}
const changePassword = async (email, oldPassword, newPassword) => {
    try {
        const user = await UserModel.findOne({ email: email })
        if (user) {
            console.log("INFO USER:", user);
            const isPasswordValid = await bcrypt.compare(oldPassword, user.password)
            console.log(isPasswordValid)
            if (isPasswordValid) {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(newPassword, salt);
                user.password = hash
                await user.save();
                return true;
            } else {
                return false
            }
        } else {
            return false;
        }
    } catch (error) {
        console.log("Change Password got an error: ", error);
        throw error;
    }
}
const disableAccount = async (email, isActive) => {
    try {
        console.log("isActive", isActive);
        const user = await UserModel.findOne({ email: email })
        if (user) {
            user.isActive = isActive;
            console.log(user.isActive);

            await user.save();
            console.log("asdasdasd", user);

            return true;
        } else {
            return false;
        }
    } catch (error) {

    }
}

const changeForgotPassword = async (email, newPassword) => {
    try {
        const user = await UserModel.findOne({ email: email })
        if (user) {
            console.log("INFO USER:", user);
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(newPassword, salt);
            user.password = hash
            await user.save();
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log("Change Password got an error: ", error);
        throw error;
    }
}
module.exports = {
    login, loginGoogle, register, deleteUser,
    updateUser, getAllUser, search, changePassword,
    disableAccount, getById, changeForgotPassword
};
