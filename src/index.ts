import { IncomingMessage } from 'http'
import {
  getCookieFromDocument,
  canUseDOM,
  setCookie,
  getCookieFromRequest,
} from './utilities'

class Internationalization<T extends string> {
  private readonly cookieName: string

  supportedLanguages: Array<T>
  fallbackLanguage: T

  /**
   * ClientInternationalization utility package for working with languages
   *
   * @param supportedLanguages { Array<string> } - List of all supported languages
   * @param fallbackLanguage { string } - Fallback language if no language matches
   * @param cookieName { string } - Optional: Set a preferred cookie name
   */
  constructor(
    supportedLanguages: Array<T>,
    fallbackLanguage: T,
    cookieName?: string
  ) {
    this.supportedLanguages = supportedLanguages
    this.fallbackLanguage = fallbackLanguage

    this.cookieName = typeof cookieName === 'string' ? cookieName : 'language'
  }

  /**
   * Detect the browser language of the client
   * If no language was found or if none of the
   * supported language matches a fallback language will be returned
   *
   * @return {string} - Detected language
   */
  detectBrowserLanguage(): T {
    // Check if the DOM is presented.
    // If the DOM isn't accessible the website may be rendered on a server
    if (canUseDOM()) {
      // Get browser language
      const browserLanguage =
        (navigator.languages && navigator.languages[0]) || navigator.language

      return (
        this.supportedLanguages.find((lang) => lang === browserLanguage) ||
        this.fallbackLanguage
      )
    }

    // Return fallback language if no DOM was found
    return this.fallbackLanguage
  }

  /**
   * Save a language to a cookie
   * If the set language isn't in the list of supported languages
   * the fallback language will be returned
   *
   * @param language { string } - Language to set
   */
  setLanguage(language: string): void {
    if (canUseDOM()) {
      const cookieLanguage =
        this.supportedLanguages.find((lang) => lang === language) ||
        this.fallbackLanguage

      setCookie(this.cookieName, cookieLanguage)
    }
  }

  /**
   * Get the current language
   * This method will first check if a language cookie is present.
   * If no cookie was found the method will get the language form the browser
   *
   * For handling cookies on the server side pass the request object
   *
   * @param request { IncomingMessage } - Optional: Request object for accessing cookies over request headers
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

    // Check for DOM
    if (canUseDOM()) {
      // Try to get language form cookie
      const language = getCookieFromDocument(this.cookieName)

      // If cookie is undefined get the language form the browser
      if (language == undefined) {
        return this.detectBrowserLanguage()
      }

      // Return found language or fallback language
      return (
        this.supportedLanguages.find((lang) => lang === language) ||
        this.fallbackLanguage
      )
    }

    return this.fallbackLanguage
  }
}

export default Internationalization
