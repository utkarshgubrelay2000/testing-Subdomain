const baseModel = require("../model/baseModel");

exports.getSubDomain=async(reqHost)=>{
   // console.log('reqHost',reqHost);
   try {
     
  
    let subdomain=reqHost?.split('.')[0];
    subdomain=subdomain?.replace('https://','');
    subdomain=subdomain?.replace('http://','');
    return subdomain
  } catch (error) {
     console.log('error',error);
  }
}
exports.checkSubDomainExist=async(subdomain)=>{
    let edtechAdminDb=await baseModel.mongoConnect('edtechAdmin','users')
    let subdomainPresent=await edtechAdminDb.findOne({subdomain})
   //console.log('subdomainPresent',subdomainPresent);
      if(subdomainPresent)
      return true;
      else
        return false;

}