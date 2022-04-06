const { ObjectId } = require("mongodb");
const { checkSubDomainExist, getSubDomain } = require("../../services/subdomainServices");
const Razorpay = require("razorpay");
const baseModel = require("../../model/baseModel");

exports.createOrder = async (req, res) => {
    const { userId, coupon } = req.body;
    let subdomain = await getSubDomain(req.get("host"));
    // check for localhost'
    console.log(subdomain,'name')
    if (subdomain == "localhost" && subdomain) 
        return res.json({ error: true, data: "No Subdomain" });
    if (checkSubDomainExist(subdomain)) {
 // let foundUser=await baseModel.mongoConnect(subdomain,'users').findOne({_id:ObjectId(req.userId)})
  //let orderModel=await baseModel.mongoConnect(subdomain,'orders')
   let paymentDetails=await baseModel.mongoConnect(subdomain,'paymentDetails')
 let  newpaymentDetails=await paymentDetails.find({}).toArray()
      paymentDetails=newpaymentDetails
    console.log(paymentDetails)
      //  let newOrder=await orderModel.insertOne({
      //    userId:ObjectId(userId),
      //  })
      //  const instance = new Razorpay({
      //   key_id: paymentDetails.razorpayKey,
      //   key_secret: paymentDetails.razorpaySecret,
      // });
      //  const options = {
      //    amount: 100 * 100, // amount in smallest currency unit
      //    currency: "INR",
      //    receipt: "receipt_order_74394",
      //  };
   
      //  const order = await instance.orders.create(options);
   
      //  if (!order) return res.status(500).send("Some error occured");
   
       res.json({
         error: false,
    //     /*order:order*/ orderId: newOrder._id,
         amount: 1000,
       });
     
     }
     else{
         res.status(500).json({ error: true, data: "Origin host not Found" });
     }
   };