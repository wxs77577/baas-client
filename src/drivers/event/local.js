export default client => {
  if (!client.$events) {
    client.$events = []
  }
  return {
    on(event, handler) {
      client.$events[event] = handler
    },
    emit(event, data) {
      console.log('%c Event >>> %s %O', 'color:green', event, data)
      client.$events[event] && client.$events[event](data)
    }
  }
}