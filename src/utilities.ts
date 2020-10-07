/**
 * Regex based filter to get cookie values
 * This includes the =
 *
 * @param name { string } - Filter keyword
 */
import { IncomingMessage } from 'http'

const getCookiePattern = (name: string): RegExp => RegExp(name + '=.[^;]*')

/**
 * Get cookie from document (Local DOM)
 *
 * @param name { string } - Cookie name
 */
function getCookieFromDocument(name: string): string | undefined {
  const pattern = getCookiePattern(name)
  const matched = document.cookie.match(pattern)

  if (!matched) {
    return undefined
  }

  const cookie = matched[0].split('=')
  return decodeURIComponent(cookie[1])
}

function getCookieFromRequest(
  name: string,
  request: IncomingMessage
): string | undefined {
  if (request.headers && request.headers.cookie) {
    const pattern = getCookiePattern(name)
    const matched = request.headers.cookie.match(pattern)

    if (!matched) {
      return undefined
    }

    const cookie = matched[0].split('=')
    return decodeURIComponent(cookie[1])
  }
}

/**
 * Set new cookie
 *
 * @param name { string } - Cookie name
 * @param value { string } - Cookie value
 */
function setCookie(name: string, value: string): void {
  document.cookie = name + '=' + value + ';path=/'
}

/**
 * Check if the DOM is available
 * if this function returns false, it means that the page is not rendered by the client.
 * However, it might be pre-rendered for example on a server.
 */
function canUseDOM(): boolean {
  return !!(
    typeof window != 'undefined' &&
    window.document &&
    window.document.createElement
  )
}

export { getCookieFromDocument, getCookieFromRequest, setCookie, canUseDOM }
