const withSass = require('@zeit/next-sass');
const withFonts = require('next-fonts');
const withCss = require('@zeit/next-css');
const withImage = require('next-images');

module.exports = withFonts(
  withImage(
    withCss(
      withSass({
        webpack(config, options) {
          // custom webpack loaders if you need
          config.module.rules.push({
            test: /\.(jpg|gif|png|svg|ico)$/i,
            use: [
              {
                loader: 'url-loader',
                options: {
                  name: '[path][name].[hash:8].[ext]',
                  publicPath: `/public`,
                  outputPath: `/public`,
                  esModule: false,
                },
              },
            ],
          });
      
          return config;
        }
      })
    )
  )
);