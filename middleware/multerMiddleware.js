const fileUploadService = require('../services/pdfUpload');

// [{ name: 'imageUrl', maxCount: 1 }, { name: 'fileUrl', maxCount: 1 }]
exports.imagesUploadMiddleware = (imageFields) => {
    console.log(imageFields)
    return async(req,res,next) => {
        try{
            const imageUpload = fileUploadService.imgUpload.fields(imageFields);
            console.log('erro on 9',imageUpload)
            try {
                
         
            imageUpload( req, res, async( error ) => {
                if( error ){
                    console.log('error: ', error.code);
                    if(error.code == 'LIMIT_FILE_SIZE'){
                        req.uploadError = {
                            msg:'File too large',
                            errorCode:1
                        };
                    }else{
                        req.uploadError = {
                            msg:error,
                            errorCode:2
                        };
                    }
                    next();
                } else {
                    console.log('req.files: ', req.files);
                    if(req.files){
                        req.uploadSuccess = {
                            msg:'Image uploaded',
                            files:req.files
                        };
                    }else{
                        req.uploadError = {
                            msg:'Did not see any file coming',
                            errorCode:3
                        };
                    }
                    next();
                }
            });
            console.log('erro on 41')
        } catch (error) {
                console.log(error)
        }
        }catch(err){
            console.log('err')
           res.status(503).json(err)
        }
    }
}