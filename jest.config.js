module.exports = {
  preset: 'react-native',
  setupFiles: [
    './jest-setup.js',
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native' +
      '|@react-navigation' +
      '|react-native-splash-screen' +
      ')/)',
  ],
  testPathIgnorePatterns: ['src/vendor', 'node_modules'],
  timers: 'fake',
};
