const textMessage = document.getElementById('text')
const chatMessagesContainer = document.getElementById('chatMessagesContainer')
const chatBox = document.getElementById('chatBox')

const scrollChats = () => {
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight
}

scrollChats()

const getMessages = (email) => {
    if (chatBox.classList.contains('chat__box__hidden')) {
        chatBox.classList.remove('chat__box__hidden')
    }

    localStorage.setItem('userEmail', JSON.stringify(email))

    try {
        socket.emit('getMessages', { email })
    } catch (error) {
        showChatMessage('Se produjo un error inesperado', '#F23030')
    }
}

const sendMessage = () => {
    try {
        if (textMessage.value) {
            socket.emit('adminSaveUserChat', {
                email: JSON.parse(localStorage.getItem('userEmail')),
                text: textMessage.value,
                response: true
            })

            textMessage.value = ''
        } else {
            showChatMessage('Escriba un mensaje', '#F23030')
        }
    } catch (error) {
        showChatMessage('Se produjo un error inesperado', '#F23030')
    }
}

socket.on('allMessages', (args) => {
    const currentUser = JSON.parse(localStorage.getItem('userEmail'))

    if (args.userEmail == currentUser) {
        chatMessagesContainer.innerHTML = ''

        if (args.allMessages.length > 0) {
            for (message of args.allMessages) {
                if (message.response) {
                    chatMessagesContainer.innerHTML +=
                        `<div class="message__to__right">
                        <div class="message__box">
                            <p>${message.text}</p>
                            <p class="message__date">${message.date}</p>
                        </div>
                    </div>`
                } else {
                    chatMessagesContainer.innerHTML +=
                        `<div class="message__to__left">
                        <div class="message__response__box">
                            <p>${message.text}</p>
                            <p class="message__date__response">${message.date}</p>
                        </div>
                    </div>`
                }
            }
        } else {
            chatMessagesContainer.innerHTML += '<p>El cliente a??n no tiene mensajes!</p>'
        }

        textMessage.setAttribute('placeholder', `Escriba un mensage a ${JSON.parse(localStorage.getItem('userEmail'))}`)

        scrollChats()
    }
})

const showChatMessage = (notificationMessage, backgroundColor) => {
    Toastify({
        text: notificationMessage,
        style: {
            color: "#FFFFFF",
            background: backgroundColor,
            duration: 2000,
            stopOnFocus: true,
        }
    }).showToast()
}