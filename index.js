'use strict';

var execFile = require('child_process').execFile;
var binPath = require('webp-bin').path;
var fs =require('fs')
var pngquant;
var pngcrush;    

module.exports = function(ret, conf, settings, opt,content) {
    var webpQuality = settings.webpQuality || 80;
    var pngCompressQuality = settings.pngCompressQuality || [80,90];
    var pngCompressSpeed = settings.pngCompressSpeed || 10;
    var pngCompressOption = !!settings.pngCompressSpeed?{"speed":pngCompressSpeed}:!!settings.pngCompressQuality?{"pngCompressQuality":pngCompressSpeed}:{"speed":pngCompressSpeed}
    
    var pngCompress;

    if(settings.pngCompressType=='pngquant'){
        if(typeof pngCompress=="undefined") {
            try{
                pngquant = require('node-pngquant-native');
            }catch(e){
                console.log("node-pngquant-native 错误");
            }
        }
        pngCompress = pngquant
    }else{
        if(typeof pngCompress=="undefined") {
            try{
                pngcrush = require('node-pngcrush');
                pngCompressOption={}
            }catch(e){
                console.log("node-pngcrush 错误");
            }
        }
        pngCompress = pngcrush
    }
    
    fis.util.map(ret.src,function(subpath,file){
        // 所有jpg,jpeg,png 图片
        if( file.ext.indexOf('jpg')!=-1 || file.ext.indexOf('png')!=-1 || file.ext.indexOf('jpeg')!=-1 ){
            // 设置生成webp图像名称与路径
            var toPathWebp = !file.useHash?settings.toPath+"/"+file.subdirname.split("/")[1]+"/"+file.basename+'_.webp':settings.toPath+"/"+file.subdirname.split("/")[1]+"/"+file.filename+"_"+file.getHash()+file.ext+'_.webp';
            // png压缩后图像名称与路径
            var CompressedPath = !file.useHash ? settings.toPath + "/" + file.subdirname.split("/")[1] + "/" + file.basename : settings.toPath + "/" + file.subdirname.split("/")[1] + "/" + file.filename+"_"+file.getHash()+file.ext;
            
            // png 压缩 file.useHash 为真 表示 prod 生产环境
            if(file.ext.indexOf('png')!=-1 && file.useHash){
                fs.readFile(file.realpath, function(err, buffer) {
                    if (err) {
                        console.log("图片文件错误:",err);
                    }else{
                        var resBuffer = pngCompress.option(pngCompressOption).compress(buffer);

                        fs.writeFile(CompressedPath, resBuffer, {
                            flags: 'wb'
                        }, function(err) {
                            if(err){
                                console.log("图片生成错误",err);
                            }else{
                                autoWebp(webpQuality, CompressedPath, toPathWebp);
                            }
                        });
                    }
                }); 
            }else{
                autoWebp(webpQuality, file.realpath, toPathWebp);
            }
        }
    })

    // webp图片生成
    function autoWebp(quality,fromPath,toPath){
        execFile(binPath, (' -q ' + quality +" " + fromPath + ' -o ' + toPath ).split(/\s+/), function(err, stdout, stderr) {
            if (err) {
                console.log("图片转换错误",err);
            } else {
                console.log('图片生成成功');
            }
        });
    }
};