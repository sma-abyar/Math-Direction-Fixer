# Math Direction Fixer

This browser extension ensures that all math formulas on RTL (right-to-left) web pages display correctly in LTR (left-to-right) direction. It targets various math rendering libraries like KaTeX, MathJax, and MathML, making them readable for users of RTL languages such as Arabic, Persian, and Hebrew.

## Features

- Forces LTR direction for all detected math elements on RTL pages
- Supports inline and display (block) math styles
- Handles dynamic content updates and late-loading math
- Targets a comprehensive list of math libraries and selectors
- Overrides page styles to ensure math direction is never inherited from RTL context
- Works on both Chrome and Firefox browsers

## Installation

### Chrome

1. Download the latest release from the [releases page](https://github.com/sma-abyar/Math-Direction-Fixer/releases).
2. Extract the ZIP file.
3. In Chrome, go to `chrome://extensions/`.
4. Enable "Developer mode" (top-right corner).
5. Click "Load unpacked" and select the extracted directory.

### Firefox

1. Download the latest release from the [releases page](https://github.com/sma-abyar/Math-Direction-Fixer/releases).
2. Extract the ZIP file.
3. In Firefox, go to `about:debugging#/runtime/this-firefox`.
4. Click "Load Temporary Add-on" and select the `manifest.json` file from the extracted directory.

## Usage

The extension automatically runs on all websites and fixes the direction of any detected math formulas. No user intervention or configuration is required.

If you encounter any issues or want to report a bug, please [open an issue](https://github.com/sma-abyar/Math-Direction-Fixer/issues/new) on this repository.

## Contributing

Contributions are welcome! If you'd like to improve this extension, please follow these steps:

1. Fork the repository.
2. Create a new branch for your changes: `git checkout -b my-new-feature`.
3. Make your changes and commit them: `git commit -am 'Add some feature'`.
4. Push to the branch: `git push origin my-new-feature`.
5. Submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE.md).

## Acknowledgments

This extension was developed with the help of the following resources:

- [MDN Web Docs](https://developer.mozilla.org/en-US/) - Documentation for web technologies
- [Stack Overflow](https://stackoverflow.com/) - Solutions to common programming problems
