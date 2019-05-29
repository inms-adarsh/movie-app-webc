/* eslint-disable import/no-extraneous-dependencies */
const defaultSettings = require('@open-wc/testing-karma/default-settings.js');
const merge = require('webpack-merge');

module.exports = config => {
  config.set(
    merge(defaultSettings(config), {
      files: [
        // allows running single tests with the --grep flag
        config.grep ? config.grep : 'src/**/*.test.js',
      ],
      webpack: {
        module: {
          rules: [
            {
              test: /\.mjs$/,
              include: /node_modules/,
              type: 'javascript/auto'
            },
            {
              test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
              use: {
                loader: 'file-loader',
                options: {
                  name: '[path][name].[ext]'
                }
              }
            },
          ]
        }
      }
      // your custom config
    }),
  );
  return config;
};
