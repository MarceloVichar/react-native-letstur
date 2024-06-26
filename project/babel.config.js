module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
      [
        'module-resolver',
        {
          root: '.',
          extensions: [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.android.js',
            '.android.tsx',
            '.ios.js',
            '.ios.tsx',
          ],
          alias: {
            '@components': './components',
            '@app': './app',
            '@schemas': './schemas',
            '@stores': './stores',
            '@utils': './utils',
            '@mocks': './mocks',
            '@hooks': './hooks',
          },
        },
      ],
    ],
  };
};
