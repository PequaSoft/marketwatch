plugins: [ 
        // new webpack.HotModuleReplacementPlugin(),
        // new NpmInstallPlugin({
        //        save: true
        //    }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ]