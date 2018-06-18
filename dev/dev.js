import BaasClient from '../src/client'
import axios from 'axios'

const client = new BaasClient({
  baseURL: 'http://localhost:5555/admin/api/',
  axios: axios,
})
// client.login({
//   username: 'admin',
//   password: 'Bhb@17384534'
// }).then(({data}) => {

// }).catch((ctx) => {
//   console.log('error', ctx.response.data)
// })

client.on('response.error', (res) => {
  const { status, data } = res || {}
  switch(status) {
    case 401: 
      console.log('Error: Login required')
      break
  }
})
const Activity = client.model('Activity')
function main() {

  // client.logout()

  const model = new Activity({
    _id: "5b2227230f0c480cc057e2c0",
    title: '33333333333'
  })

  model.save().then(data => {
    Activity.fetch().then(data => {
      console.log(JSON.stringify(data.data, null, 2))
    })
  })
}
// main()
// Course.fetch({ page: 4 }).then(({ data }) => {
//   console.log(JSON.stringify(data.data, null, 2))
// })