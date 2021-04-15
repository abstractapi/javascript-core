const path = require("path")

module.exports = {
    entry: path.resolve(__dirname, "src/index.js"),
    // entry: ['@babel/polyfill', path.resolve(__dirname, "src/index.js")],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "javascript-core.js",
        libraryTarget: "umd",
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: "babel-loader",
            },
        ],
    },
    mode: "production",
}