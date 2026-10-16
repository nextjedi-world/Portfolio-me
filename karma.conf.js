// Karma config. Angular's karma builder merges this with its defaults.
// ChromeHeadlessCI runs without a sandbox/GPU so it can start on GitHub-hosted Linux runners.
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
    ],
    reporters: ['progress'],
    browsers: ['ChromeHeadless'],
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
      },
    },
    browserNoActivityTimeout: 60000,
    captureTimeout: 60000,
    browserDisconnectTolerance: 1,
    restartOnFileChange: false,
    singleRun: false,
  });
};
