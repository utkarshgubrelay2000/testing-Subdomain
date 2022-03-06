const baseModel = require("../model/baseModel");

exports.getSubDomain=async(reqHost)=>{
    let subdomain=reqHost.split('.')[0];
    subdomain=subdomain.replace('https://','');
    subdomain=subdomain.replace('http://','');
    return subdomain
}
exports.checkSubDomainExist=async(subdomain)=>{
    let edtechAdminDb=await baseModel.mongoConnect('edtechAdmin','users')
    let subdomainPresent=await edtechAdminDb.findOne({subdomain})
      if(!subdomainPresent)
      return false;
      else
        return true;

}