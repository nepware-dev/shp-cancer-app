module.exports = {
  root: true,
  extends: '@react-native',
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};
