class EventEmitter {

    constructor () {
        this.events = {}
    }

    on (event, callback){
        if(!this.events[event]){
            this.events[event] = []
        }
        this.events[event].push(callback)
    }

    off (event, callback) {
        if(this.events[event]){
            const checkNameCallback = (cb) => cb != callback
            const newArrEvent = this.events[event].filter(checkNameCallback)
            this.events[event] = newArrEvent
        }
    }

    once(event, callback){

        const wrapper = (...args) => {
            callback(...args)
            this.off(event, callback)
        }
        this.on(event, wrapper)

    }

    emit(event, ...args){

        if(this.events[event]?.length == 0) return false
        const copyFuncArr = this.events[event]
        copyFuncArr.forEach(func => {
            func(...args)
        });
        return true

    }

    eventNames(){
        return Object.keys(this.events)
    }

}

const emitter = new EventEmitter()

function testEM (d) {
    console.log('есть', d)
}

emitter.on('event1', testEM)
emitter.once('event2', data => console.log('event2', data))

emitter.emit('event1', 'kek')