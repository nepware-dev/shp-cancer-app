module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
      },
    ],
    [
      'module-resolver',
      {
        root: './src',
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@rna': './src/vendor/react-native-arsenal/lib',
          screens: './src/screens/',
          navigation: './src/navigation',
          services: './src/services',
          store: './src/store',
          utils: './src/utils',
          components: './src/components',
          assets: './src/assets',
        },
      },
    ],
  ],
};
