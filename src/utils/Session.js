const LOGIN_COOKIE_NAME = 'thereisaway'
const REFRESH_TOKEN = "thereisanotherway"

export function isAuthenticated () {
  return _getCookie(LOGIN_COOKIE_NAME)
}

export function getRefresh () {
  return _getCookie(REFRESH_TOKEN)
}

export function authenticateSuccess (token, refreshToken) {
  _setCookie(REFRESH_TOKEN, refreshToken, 60*60*1000)
  _setCookie(LOGIN_COOKIE_NAME, token, 30*60*1000)
}

export function logout () {
  _setCookie(LOGIN_COOKIE_NAME, '', 0)
  _setCookie(REFRESH_TOKEN, '', 0)
}

function _getCookie (name) {
  let start, end
  if (document.cookie.length > 0) {
    start = document.cookie.indexOf(name + '=')
    if (start !== -1) {
      start = start + name.length + 1
      end = document.cookie.indexOf(';', start)
      if (end === -1) {
        end = document.cookie.length
      }
      return unescape(document.cookie.substring(start, end))
    }
  }
  return ''
}

function _setCookie (name, value, expire) {
  let date = new Date()
  date.setTime(date.getTime() + expire)
  document.cookie = name + '=' + escape(value) + '; path=/' +
    (expire ? ';expires=' + date.toGMTString() : '')
}

