Internationalization
====================

This package includes utilities for working with different languages in the browser.

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
import Internationalization from '@aboutbits/internationalization'

let supportedLanguages = ['en', 'de', 'it']
let fallbackLanguage = 'en'

let i18n = new Internationalization(supportedLanguages, fallbackLanguage)

let language = i18n.detectBrowserLanguage()

console.log(language)
```

## Build & Publish

To build and publish the package, simply commit all changes and push them to master. Then run one of the following commands locally:

```bash
npm version patch
npm version minor
npm version major
```

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
