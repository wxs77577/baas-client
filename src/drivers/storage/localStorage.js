export default client => {
  return {
    set(name, value) {
      return localStorage.setItem(name, JSON.stringify(value))
    },
    get(name, defaultValue = "null") {
      return JSON.parse(localStorage.getItem(name) || defaultValue)
    },
    remove(name) {
      localStorage.removeItem(name)
    },
    clear() {
      localStorage.clear()
    }
  }
}