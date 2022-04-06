const { ObjectId } = require("mongodb");
const baseModel = require("../../model/baseModel");
const {
  getSubDomain,
  checkSubDomainExist,
} = require("../../services/subdomainServices");

exports.getcouponById = async (req, res) => {
  let { id } = req.params;

  // get subdomain
  id = ObjectId(id);

  try {
    let subdomain = await getSubDomain(req.get("origin"));
    if (checkSubDomainExist(subdomain)) {
      let couponCollection = await baseModel.mongoConnect(
        req.subdomain,
        "coupon"
      );

      const result = await couponCollection.findOne({ _id: id });
      console.log("stop");

      res.json({ error: false, data: result });
    } else {
      res.status(500).json({ error: true, data: "Origin host not Found" });
    }
    //  res.status(500).json({error:true, data: "Origin host not Found" });
  } catch (error) {
    res.status(500).json({ error: true, data: error.message });
  }
};
exports.getcoupon = async (req, res) => {
  let subdomain = await getSubDomain(req.get("host"));
  // check for localhost'
  console.log("subdomain", subdomain);

  if (subdomain == "localhost" && subdomain) {
    return res.json({ error: true, data: "No Subdomain" });
  } else if (checkSubDomainExist(subdomain)) {
    try {
      let couponCollection = await baseModel.mongoConnect(
        subdomain,
        "coupon"
      );
      const result = await couponCollection.find({}).toArray();
      res.json({ error: false, data: result });
    } catch (error) {
      res.status(500).json({ error: true, data: error.data });
    }
  } else {
    res.status(500).json({ error: true, data: "Origin host not Found" });
  }
};
