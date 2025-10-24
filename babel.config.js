module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            // Map "@/" imports to the frontend folder from the repository root
            '@': './frontend'
          }
        }
      ],
      // expo-router/babel is deprecated in SDK 50+. babel-preset-expo already includes needed transforms.
    ]
  };
};
