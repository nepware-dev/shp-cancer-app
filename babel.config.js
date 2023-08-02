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
          assets: './src/assets',
          components: './src/components',
          navigation: './src/navigation',
          screens: './src/screens/',
          services: './src/services',
          store: './src/store',
          utils: './src/utils',
        },
      },
    ],
  ],
};
