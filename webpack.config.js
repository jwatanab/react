module.exports = {
    entry: './src/script.js',
    output: {
        filename: 'bundle/script.js'
    },
    module: {
        rules: [
            {
                test: /.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
}