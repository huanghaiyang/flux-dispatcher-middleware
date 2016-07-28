'use strict'

const DispatcherPack = Dispatcher => class extends Dispatcher {
    constructor (args) {
        super(args)
        this.events = {}
    }
    _invokeCallback (id) {
        super._invokeCallback(id)
        let after = this.events['afterDispatching']
        if (after) {
            after.forEach((handler) => {
                handler(this._pendingPayload)
            })
        }
    }

    on (eventname, handler) {
        if (!this.events[eventname]) {
            this.events[eventname] = []
        }
        this.events[eventname].push(handler)
    }

    unbind (eventname, handler) {
        if (!handler) {
            delete this.events[eventname]
        }
    }
}

module.exports = DispatcherPack
