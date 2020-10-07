import { IncomingMessage } from 'http'
import { getCookieFromRequest } from './utilities'
import ClientInternationalization from './ClientInternationalization'

class ServerInternationalization<
  T extends string
> extends ClientInternationalization<T> {
  /**
   * ServerInternationalization utility package for working with languages
   *
   *
   * @param supportedLanguages { Array<string> } - List of all supported languages
   * @param fallbackLanguage { string } - Fallback language if no language matches
   * @param cookieName { string } - Optional: Set a preferred cookie name
   */
  constructor(
    supportedLanguages: Array<T>,
    fallbackLanguage: T,
    cookieName: string
  ) {
    super(supportedLanguages, fallbackLanguage, cookieName)
  }

  /**
   * Get the current language
   * This method will first check if a language cookie is present.
   * If no cookie was found the method will get the language form the browser
   *
   * @return { string } - Found language or fallback language
   */
  detectLanguage(request?: IncomingMessage): T {
    // Check if request is not undefined
    if (request) {
      // Try to get language form cookie
      const cookieFromRequest = getCookieFromRequest(this.cookieName, request)

      if (cookieFromRequest) {
        return cookieFromRequest as T
      }

      // Get accept language from request header
      const acceptLanguage = request.headers['accept-language']

      if (acceptLanguage) {
        // Extract the locale string and the priority from header string
        const requestedLocales = acceptLanguage.split(',').map((part) => {
          const [locale, priority] = part.trim().split(';q=')

          return { locale, priority: parseInt(priority) }
        })

        // Get the potential locale from requested locales array
        const potentialLocale = requestedLocales
          .sort((a, b) => b.priority - a.priority)
          .find(
            ({ locale }) =>
              locale !== '*' &&
              this.supportedLanguages.some((lang) => locale === lang)
          )

        // Check if the potential locale is not undefined else return the fallback language
        return (potentialLocale
          ? potentialLocale.locale
          : this.fallbackLanguage) as T
      }
    }

    return this.detectBrowserLanguage()
  }
}

export default ServerInternationalization
