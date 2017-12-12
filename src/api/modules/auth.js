import { factory } from '../http'

export default {
  login: factory.createPost('account/login'),
  register: factory.createPost('account/Register'),
  sendSmsCode: factory.createPost('account/SmsCode'),
  getSmsLeftSeconds: factory.createGet('account/SmsLeftSeconds')
}
