export default client => {
  if (!client.$store) {
    client.$store = {}
  }
  return {
    set(name, value) {
      return client.$store[name] = value
    },
    get(name, defaultValue = "null") {
      return client.$store[name] || defaultValue
    },
    remove(name) {
      delete client.$store[name]
    },
    clear() {
      client.$store = {}
    }
  }
}