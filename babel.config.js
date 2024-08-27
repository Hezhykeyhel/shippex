// module.exports = {
//   presets: ['module:@react-native/babel-preset'],
//   plugins: [
//     'react-native-reanimated/plugin'
//   ],
// };


module.exports = function (api) {
  api.cache.never()
  return {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [
            ".ios.js",
            ".android.js",
            ".js",
            ".ts",
            ".tsx",
            ".json",
            ".svg",
          ],
          alias: {
            "@/assets": ["./src/shared/assets"],
            "@/shared": ["./src/shared"],
            "@/components": ["./src/shared/components"],
            "@/navigation": ["./src/navigation"],
            "@/services": ["./src/services"],
            "@/screens": ["./src/screens"],
          },
        },
      ],
      "react-native-reanimated/plugin",
      "@babel/plugin-proposal-export-namespace-from",
    ],
  };
};
