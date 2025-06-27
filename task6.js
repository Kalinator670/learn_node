const { scrypto } = require('node:crypto')
const { Worker } = require('node:worker_threads')


const userPasswords = [{userId: 1, password: 'jash71'}, {userId: 2, password: 'asdj5u'}, {userId: 3, password: '_ok59'}]

for(const userPassword of userPasswords) {

    const worker = new Worker('./worker.js', {
        workerData: {password: userPassword.password, user: userPassword.userId}
    })

    worker.on('message', data => {
        console.log(data)
    })

}
