const Course = require('../model/courseModel')
const order=require('../model/orderModel')
const userModel=require('../model/userModel')
const admin=require('../model/adminModel')
const bcryptjs = require("bcryptjs");
const { nanoid } = require("nanoid");
exports.getOrders=(req,res)=>{
    order.find({confirmPayment:true}).populate('BuyedBy')
    .populate({path:'course.courseId',model:'Course'}).then(orders=>{
        res.json({data:orders,error:false})
    }).catch(err=>{
        res.status(404).json({error:true,data:"Something went Wrong ",errMsg:err})
    })
}
exports.assignCourse=(req,res)=>{
  //console.log(req.body.id)
  
  req.body.courses.map(course=>{
    
    userModel.findById(req.body.id).then((foundUser) => {
      let newCart = foundUser.myCart;
      let response = false;
      foundUser.myCart.map((cartItems) => {
        if (cartItems.courseId._id == course) {
          console.log(true)
          response = true;
        }
      });
      if (!response) {
        Course.findById(course).then(foundCourse=>{

          newCart.push({ date: new Date(), courseId: foundCourse });
          foundUser.myCart = newCart;
          foundUser.save();
        })
       
      }
      
    });
  })
  res.json('done')
   
  
}
exports.getAllUsers=(req,res)=>{
  userModel.find({},{password:0}).populate('myCart.courseId').then(found=>{
    res.json(found)
  }).catch(err=>{
    res.status(404).json('Something went wrong')
  })
}
exports.RemoveCourse=(req,res)=>{
  const {id,courseId}=req.body
  userModel.findById(id).then(found=>{
  let Cart=[];
  found.myCart.map(item=>{
    if(item.courseId._id!=courseId){
         Cart.push(item)
    }
  })
  found.myCart=Cart;
  found.save()
  res.json('deleted ')
  }).catch(err=>{
    res.status(404).json('Something went wrong')
  })
}
exports.getRefUsers=(req,res)=>{
  order.find({confirmPayment:true,affilicateExist:true}).populate({path:'Affilicate.user',model:"User"})
 .then(orders=>{
    res.json({data:orders,error:false})
}).catch(err=>{
    res.status(404).json({error:true,data:"Something went Wrong ",errMsg:err})
})
}
exports.getUserCart=(req,res)=>{
  console.log(req.params.id)
    userModel.findById(req.params.id,{password:0}).populate('myCart.courseId').then(found=>{
        res.json({data:found,error:false})
  
    }).catch(err=>{
      res.status(404).json(err)
    })
  
   
   
  }
  exports.getMyProfile=(req,res)=>{
 
    admin.findById(req.body.userId,{password:0}).populate('myCart.courseId').then(found=>{
        res.json({data:found,error:false})
  
    }).catch(err=>{
      res.status(404).json(err)
    })
  
   
   
  }

  exports.createUser = (req, res) => {
  const { fname,lname, email, password, mobile} = req.body;
 // const mobileNumber = req.body.mobileNumber ? req.body.mobileNumber : null;
  /**  name:string, 
    mobileNumber:number,
    password:string,
   */
  // validation

    userModel.findOne({$or:[{email: email},{mobile:mobile}] }).then((user) => {
      if (user) {
        res.status(404).json({ error:true,data: "user with same email or phone no. Exists" });
      } else {
        bcryptjs.hash(password, 12).then((hashedpassword) => {
          let aCode=fname+nanoid(4)
          let newStudent = new userModel({
            email: email,
            password: hashedpassword,
            fname: fname,
            lname: lname,
            mobile: mobile,
            affiliateCode:aCode
          });
          console.log(newStudent)
        //  console.log('done');
          newStudent
            .save()
            .then((user) => {
             // console.log(user);
            
              res.json({
                message: "User Created Successfully",
              });
            })
            .catch((err) => {
              //   console.log(err.message)
              res.status(404).json({ error: err.message });
            });
        });
      }
    });
  
};
