const {
    getUserByIdDao,
    updateUserDao
} = require('../daos/userDao')
const { userValidator, idValidator } = require('../utils/validateData')

const getUserByIdService = async (userId) => {
    try {
        const isValidId = idValidator(userId)
        if (isValidId == false) throw Error('Error en los datos a utilizar')

        const userFound = await getUserByIdDao(userId)
        return userFound
    } catch (error) {
        throw error
    }
}

const updateUserService = async (userId, userToUpdate) => {
    try {
        const isValidId = idValidator(userId)
        if (isValidId == false) throw Error('Error en los datos a utilizar')

        const isValidUser = userValidator(userToUpdate)
        if (isValidUser == false) throw Error('Complete los datos necesarios correctamente')

        const user = await getUserByIdService(userId)
        if (!user) throw Error('No se encontró el usuario a actualizar')

        const result = await updateUserDao(userId, userToUpdate)
        return result
    } catch (error) {
        throw error
    }
}

module.exports = {
    getUserByIdService,
    updateUserService
}