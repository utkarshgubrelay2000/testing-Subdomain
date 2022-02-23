const aws = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );
const multer = require('multer');
const path = require( 'path' );

const s3 = new aws.S3({
	accessKeyId: process.env.AWS_USER_ACCESS_KEY,
	secretAccessKey: process.env.AWS_USER_ACCESS_SECRET,
	Bucket: process.env.AWS_BUCKET_NAME,

});
console.log(process.env.Region)
exports.imgUpload = multer({
	storage: multerS3({
		s3: s3,
		bucket: process.env.AWS_BUCKET_NAME,
		acl: 'public-read',
		key: function (req, file, cb) {
			cb(null, (req.query.folder ? req.query.folder : 'general') +'/' + path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
		}
	}),
	limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
	// fileFilter: function( req, file, cb ){
	// 	checkFileType( file, cb );
	// }
});


function checkFileType( file, cb ){
	// Allowed ext
	const filetypes = /pdf|docx/;
	// Check ext
	const extname = filetypes.test( path.extname( file.originalname ).toLowerCase());
	// Check mime
	console.log(extname,file.mimetype)
	const mimetype = filetypes.test( file.mimetype );
	if( mimetype && extname ){
		return cb( null, true );
	} else {
		cb( 'Images Only!' );
	}
}