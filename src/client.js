import Model from './model'
import Drivers from './drivers/*/*'

export default class BaasClient {
  constructor(options) {
    this.options = Object.assign({}, options)
    const {
      baseURL,
      authTokenKey = 'token'
    } = this.options
    this.initDrivers()
  }

  initDrivers(drivers) {
    const {
      http = 'axios',
      storage = 'localStorage',
      event = 'local'
    } = this.options.drivers
    this.$http = Drivers.http[http + '.js'].default(this)
    this.$storage = Drivers.storage[storage + '.js'].default(this)
    this.$event = Drivers.event[event + '.js'].default(this)
  }

  addDriver(key, instance) {
    this['$' + key] = instance
  }

  login(params) {
    return this.$http.post('login', params).then(res => {
      const { data } = res
      this.setStorage(this.options.authTokenKey, data.token)
      this.setStorage('user', data.user)
      return res
    })
  }
  on(eventName, handler) {
    return this.$event.on(eventName, handler)
  }
  emit(eventName, data) {
    return this.$event.emit(eventName, data)
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
