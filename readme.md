Internationalization
====================

[![npm package](https://badge.fury.io/js/%40aboutbits%2Finternationalization.svg)](https://badge.fury.io/js/%40aboutbits%2Finternationalization)
[![license](https://img.shields.io/github/license/aboutbits/internationalization)](https://github.com/aboutbits/internationalization/blob/master/license.md)

This package includes utilities for working with different languages in the browser. 
This package works for client side rendered applications as well as for server side rendered applications.

## Table of content

- [Usage](#usage)
- [Build & Publish](#build--publish)
- [Information](#information)

## Usage

First, you have to install the package:

```bash
npm install @aboutbits/internationalization
```

Second, you can setup the tool with all supported languages and the fallback language and then detect the given browser language.

```js
import { Internationalization } from '@aboutbits/internationalization'

let supportedLanguages = ['en', 'de', 'it']
let fallbackLanguage = 'en'

let i18n = new Internationalization(supportedLanguages, fallbackLanguage)

// Fetches the language only from the user's browser
let browserLanguage = i18n.detectBrowserLanguage()

// First check the cookies to see if a language is set. If not it will look in the browser.
// You can also pass a requiest obejct with which the language can be recognized already during the server side rendering
let language = i18n.detectLanguage()

// Sets a cookie with the specified language. 
// There exists also a static version of this method. 
// Ex. Internationalization.setLanguage("de")
i18n.setLanguage("de")

console.log(browserLanguage)
console.log(language)
```

## Build & Publish

To build and publish the package, visit the GitHub Actions page of the repository.

You can choose between two workflows:
- `Release Package` to publish a new version of the package.
- `Pre-Release Package` to publish a new pre-release version of the package.

**Note:** Pre-releases need to be supplied with a pre-id.

**Note:** To increment a pre-release, you have to run the normal release workflow and select "prerelease". For this action you need to already be on a pre-release version.

## Information

About Bits is a company based in South Tyrol, Italy. You can find more information about us on [our website](https://aboutbits.it).

### Support

For support, please contact [info@aboutbits.it](mailto:info@aboutbits.it).

### Credits

- [Alex Lanz](https://github.com/alexlanz)
- [Martin Malfertheiner](https://github.com/mmalfertheiner)
- [All Contributors](../../contributors)

### License

The MIT License (MIT). Please see the [license file](license.md) for more information.
