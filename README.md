# fis-postpackager-webp

[![npm version](https://badge.fury.io/js/fis-postpackager-webp.svg)](https://badge.fury.io/js/fis-postpackager-webp)

A postpackager for fis to convert png or jpg or jpeg file to webp. And compress png file.

##install
		
	$ npm install fis-postpackager-webp -g

##useAge

	// fis-conf.js
	fis.match('::package', {
	    postpackager: fis.plugin('webp', {
	        webpQuality: 60,                                                        // webp生成质量
	        toPath: fis.get('DIST') + 'htdocs/res/img/page/event/' + fis.get('ID'), // webp生成存储的路径
	        padthID: fis.get('ID'),                                                 // 当前活动ID
	        // pngCompressQuality: [80,90],                                         // png图片压缩选项 pngquant时配置 默认[80,90] pngCompressQuality 和 pngCompressSpeed 二者选一
	        pngCompressSpeed: 10,                                                   // png图片压缩选项 pngquant时配置 默认10
	        pngCompressType: 'pngquant',                                            // png图片使用的工具 默认：pngquant 可选：pngcrush
	    })
	})
	

 
##reference

- [fis-optimizer-png-compressor](https://www.npmjs.com/package/fis-optimizer-png-compressor "fis-optimizer-png-compressor")

- [node-pngquant-native](https://www.npmjs.com/package/node-pngquant-native "node-pngquant-native")

- [node-pngcrush](https://www.npmjs.com/package/node-pngcrush)
