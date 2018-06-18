import Model from './model'
import drivers from './drivers/*/*.js'

export default class BaasClient {
  constructor(options) {
    this.options = Object.assign({}, options)
    const {
      baseURL,
      authTokenKey = 'token'
    } = this.options
    this.initDrivers()
  }

  initDrivers() {
    const {
      http = 'axios',
      storage = 'localStorage',
      event = 'local'
    } = this.options.drivers || {}
    this.$http = drivers.http[http].default(this)
    this.$storage = drivers.storage[storage].default(this)
    this.$event = drivers.event[event].default(this)
  }

  addDriver(key, instance) {
    this['$' + key] = instance
  }
  /**
   * Add an event listener
   * @param {String} eventName Name of the event
   * @param {Function} handler Function will be executed when the event is triggered.
   */
  on(eventName, handler) {
    return this.$event.on(eventName, handler)
  }
  /**
   * Trigger an event with some data
   * @param {String} eventName Name of the event
   * @param {any} data data send to the event handler
   */
  emit(eventName, data) {
    return this.$event.emit(eventName, data)
  }
  /**
   * 
   * @param {Object} params Post data for login api
   */
  login(params) {
    return this.$http.post('login', params).then(res => {
      const { data } = res
      this.setStorage(this.options.authTokenKey, data.token)
      this.setStorage('user', data.user)
      return res
    })
  }
  
  logout() {
    return this.setStorage(this.options.authTokenKey, null)
  }
  register(params) {
    return this.$http.post('register', params)
  }
  setStorage(name, value) {
    return this.$storage.set(name, value)
  }
  getStorage(name, defaultValue = "null") {
    return this.$storage.get(name, defaultValue)
  }
  getToken() {
    return this.getStorage(this.options.authTokenKey)
  }
  resource(name) {
    const NewModel = Model
    NewModel.init(name, { http: this.$http, baseURL: this.options.baseURL })
    return NewModel
  }
  model(name) {
    return this.resource(name)
  }
}

if (typeof module !== 'undefined') {
  module.exports = BaasClient
}