import inflection from 'inflection'

export default class Model {
  constructor(data) {
    this.attributes = data
  }
  set attributes(value){
    this.$attributes = value
  }
  get attributes() {
    return this.$attributes
  }
  get(name) {
    return this.$attributes[name]
  }
  set(name, value){
    this.$attributes[name] = value
    return true
  }
  static get name() {
    return this.$name
  }
  static init(name, options) {
    options = Object.assign({
      primaryKey: '_id'
    }, options)
    this.primaryKey = options.primaryKey
    this.$name = name
    this.resourceName = inflection.underscore(inflection.pluralize(name))
    // this.resourceName = name
    this.prototype.$attributes = {}
    this.$http = Object.assign({}, options.http)
    this.$http.defaults.baseURL = options.baseURL + this.resourceName + '/'
    this.prototype.$http = this.$http
  }

  static fetch(query = {}) {
    return this.$http.get('', { params: { query } })
  }

  static find(id) {
    return this.$http.get(id)
  }

  isNew() {
    return !this.primaryKeyValue()
  }
  primaryKeyValue() {
    return this.attributes[this.constructor.primaryKey]
  }

  save() {
    const method = this.isNew() ? 'post' : 'put'
    return this.$http[method](this.primaryKeyValue() || '', this.attributes)
  }

  delete() {
    return this.$http.delete('')
  }

  static delete(id) {
    return this.$http.delete(id)
  }

}