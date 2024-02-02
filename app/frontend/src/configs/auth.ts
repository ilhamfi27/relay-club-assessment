export default {
  meEndpoint: '/api/openid/me',
  loginEndpoint: '/api/openid/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken',
  idTokenKeyName: 'idToken',
  userDataKey: 'userData'
}
