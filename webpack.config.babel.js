import webpack            from 'webpack';
import autoprefixer       from 'autoprefixer';
import ExtractTextPlugin  from 'extract-text-webpack-plugin';
// import CopyWebpackPlugin  from 'copy-webpack-plugin';
import nodeExternals      from 'webpack-node-externals';
import yargs              from 'yargs'; // Permite acceder a argumentos de invocacion del proceso

const webpackConfig = {};
// Librerias que no se quieren incluir en el código generado.
webpackConfig.externals = {
  "angular": "angular"
};
// Desde que archivo empieza a leer el codigo, añadiendo todo codigo que esté importado.
webpackConfig.entry = {
  app: './src/app.js'
};
webpackConfig.output = {
  path: __dirname + '/dist',
  filename: '[name].bundle.js',
  chunkFilename: '[name].bundle.js',
  library: 'testApp',
  libraryTarget: 'umd'
};
webpackConfig.devtool = 'source-map';
// Plugins que transforman el codigo
webpackConfig.module = {
  rules: [{
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    options: {
      presets: ['es2015']
    }
  }, {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract({
      fallbackLoader: 'style-loader',
      loader: [
        {loader: 'css-loader', query: {sourceMap: true}},
        {loader: 'postcss-loader'}
      ],
    })
  }, {
    test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
    loader: 'file-loader'
  }, {
    test: /\.html$/,
    loader: 'raw-loader'
  }]
};
// Encapsula clases css
webpackConfig.plugins = [
  new webpack.LoaderOptionsPlugin({
    test: /\.scss$/i,
    options: {
      postcss: {
        plugins: [autoprefixer]
      }
    }
  })
];
webpackConfig.plugins.push(
  new webpack.NoErrorsPlugin(),           // No genera archivos si da error
  new webpack.optimize.DedupePlugin(),    // Dedupe modules in the output
  new webpack.optimize.UglifyJsPlugin()   // Uglify de turno
  // new CopyWebpackPlugin([{
  //   from: __dirname + '/src/public'
  // }])
);

export default webpackConfig;

