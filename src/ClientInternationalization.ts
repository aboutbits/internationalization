import { getCookieFromDocument, canUseDOM, setCookie } from './utilities'

class ClientInternationalization<T extends string> {
  protected readonly cookieName: string

  supportedLanguages: Array<T>
  fallbackLanguage: T

  /**
   * ClientInternationalization utility package for working with languages
   *
   * Please note! All methods in this class will only run on the client side
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
  saveLanguage(language: string): void {
    if (canUseDOM()) {
      const cookieLanguage =
        this.supportedLanguages.find((lang) => lang === language) ||
        this.fallbackLanguage

      setCookie(this.cookieName, cookieLanguage)
    }
  }

  /**
   * Save a language to a cookie
   * This method will not check if the language you want to set is supported
   * Please note! If you have changed the cookie name, you must change it here as well
   *
   * @param language { string } - Language to set
   * @param cookieName { string } - Optional: Cookie name
   */
  static setLanguage(language: string, cookieName?: string): void {
    if (canUseDOM()) {
      cookieName = typeof cookieName === 'string' ? cookieName : 'language'

      setCookie(cookieName, language)
    }
  }

  /**
   * Get the current language
   * This method will first check if a language cookie is present.
   * If no cookie was found the method will get the language form the browser
   *
   * @return { string } - Found language or fallback language
   */
  detectLanguage(): T {
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

    // Return fallback language is DOM is null
    return this.fallbackLanguage
  }
}

export default ClientInternationalization
