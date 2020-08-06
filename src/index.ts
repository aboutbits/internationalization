class Internationalization<T extends string> {
  supportedLanguages: T[]
  fallbackLanguage: T

  constructor(supportedLanguages: T[], fallbackLanguage: T) {
    this.supportedLanguages = supportedLanguages
    this.fallbackLanguage = fallbackLanguage
  }

  detectBrowserLanguage(): T {
    const browserLanguage =
      (navigator.languages && navigator.languages[0]) || navigator.language

    return (
      this.supportedLanguages.find((lang) => lang === browserLanguage) ||
      this.fallbackLanguage
    )
  }
}

export { Internationalization as default }
