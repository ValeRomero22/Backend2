const {
    getAllUserMessagesService,
    saveMessageService
} = require('../services/messageService')
const { errorLogger } = require('../utils/winstonLogger')

const socketConfig = (io) => {
    io.on('connection', async (socket) => {
        socket.on('adminSaveUserChat', async (args) => {
            try {
                const { email, text, response } = args

                const newMessage = {
                    email,
                    date: new Date(),
                    text,
                    response
                }

                await saveMessageService(newMessage)

                const allMessages = await getAllUserMessagesService(args.email)
                io.sockets.emit('allMessages', {
                    allMessages,
                    userEmail: args.email
                })
            } catch (error) {
                errorLogger.error(`socketConfig.js | socketConfig(): ${error}`)
                throw new Error(error)
            }
        })

        socket.on('saveUserChat', async (args) => {
            try {
                const { email, text, response } = args

                const newMessage = {
                    email,
                    date: new Date(),
                    text,
                    response
                }

                await saveMessageService(newMessage)

                const allMessages = await getAllUserMessagesService(args.email)
                io.sockets.emit('allMessages', {
                    allMessages,
                    userEmail: args.email
                })
            } catch (error) {
                errorLogger.error(`socketConfig.js | socketConfig(): ${error}`)
                throw new Error(error)
            }
        })

        socket.on('getMessages', async (args) => {
            try {
                const allMessages = await getAllUserMessagesService(args.email)

                io.sockets.emit('allMessages', {
                    allMessages,
                    userEmail: args.email
                })
            } catch (error) {
                errorLogger.error(`socketConfig.js | socketConfig(): ${error}`)
                throw new Error(error)
            }
        })
    })
}

module.exports = socketConfig