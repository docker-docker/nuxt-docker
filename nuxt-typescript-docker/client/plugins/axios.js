import { setClient } from '@/assets/js/HttpClient'

export default ({
  $axios,
  error,
  store,
  router
}) => {
  // common config
  $axios.onRequest((config) => {

  })
  $axios.onResponse((response) => {

  })
  $axios.onError((error) => {
    console.log('http request error: ', error)
  })
  setClient($axios)
}
