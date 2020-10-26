const withSass = require('@zeit/next-sass');
const withFonts = require('next-fonts');
const withCss = require('@zeit/next-css');
const withImage = require('next-images');

module.exports = withFonts(
  withImage(
    withCss(
      withSass({
        webpack(config, options) {
          
          return config;
        }
      })
    )
  )
);