const { parentPort, workerData } = require('worker_threads')
const crypto = require('node:crypto')

const {user, password } = workerData

const salt = crypto.randomBytes(16).toString('hex')

crypto.scrypt(password, salt, 64, (err, outString) => {
    if(err) throw Error(err)
    
    parentPort.postMessage({
        user,
        hash: outString.toString('hex'),
        salt
    })

})
