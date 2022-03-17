
var aws = require('aws-sdk');

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_USER_ACCESS_KEY,
  secretAccessKey: process.env.AWS_USER_ACCESS_SECRET,
//  Bucket: process.env.AWS_BUCKET_NAME,
});
exports.postUploadImage = (req, res, next) => {
  
  try {
   console.log(req.subdomain)
  
    const bb = req.busboy;
    req.pipe(req.busboy);
let imageArray=[]
    req.busboy.on('file', (name, file, info) => {
  const { filename, encoding, mimeType } = info;
  
 console.log(filename);
  let fileName = filename;

  let params={
    Bucket: 'testbrandwick/'+req.subdomain,
    Key: fileName,
    Body: file,
    ACL: 'public-read',
  }
  s3.upload(params, (err, data) => {
		if (err) {
			console.log(err);
	//		res.status(400).json({ error: 'Upload to S3 failed.' });
		}
    else{

      res.status(200).json({
        url: data.Location,
        key: data.key
      });
    }
	}
	);

});


} catch (error) {
   console.log(error) 
}
 
}