const path = require("path");

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "development",
  devtool: 'inline-source-map',//ブラウザでのデバッグ用にソースマップを出力する

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: path.join(__dirname, "src/main"),

  // ファイルの出力設定
  output: {
    path: path.join(__dirname, "dist"),
    // 出力ファイル名
    filename: "bundle.js",
    devtoolModuleFilenameTemplate: '[absolute-resource-path]'
  },
  devServer: {
    openPage: "index.html",//自動で指定したページを開く
    contentBase: path.join(__dirname, 'dist'),// HTML等コンテンツのルートディレクトリ
    watchContentBase: true,//コンテンツの変更監視をする
    host: "0.0.0.0",
    hot: true,
  },
  module: {
    rules: [
      {
        // 拡張子 .ts の場合
        test: /\.ts$/,
        exclude: /node_modules/,
        // TypeScript をコンパイルする
        use: 'ts-loader',
      },
    ],
  },
  // import 文で .ts や .tsx ファイルを解決するため
  resolve: {
    extensions: [".ts", ".js"],
  },
};
