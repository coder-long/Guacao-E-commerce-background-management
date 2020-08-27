import server from '../utils/request'

export function getLogin(data) {
  return server({
    method: 'post',
    url: '/api/login',
    data
  })
}
