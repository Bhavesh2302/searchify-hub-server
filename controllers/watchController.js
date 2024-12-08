const {Router} = require('express')
const { Watch } = require('../models/watchModel')

const watchController = Router()

watchController.get("/get", async (req, res) => {
    const { brand, category, gender, sort, skip, limit, search } = req.query;
    let aggregatePipeline = [];
    let matchStage = {};
  
    try {
      if (brand) matchStage.brand = { $in: brand };
      if (category) matchStage.category = { $in: category };
      if (gender) matchStage.suitable_for = { $in: gender };
  
      if (search) {
        matchStage.$or = [
          { brand: { $regex: search, $options: "i" } },
          { category: { $regex: search, $options: "i" } },
          { suitable_for: { $regex: search, $options: "i" } },
          { name: { $regex: search, $options: "i" } },
        ];
      }
  
      if (Object.keys(matchStage).length > 0) {
        aggregatePipeline.push({ $match: matchStage });
      }
  
      if (sort) {
        aggregatePipeline.push({ $sort: { price: Number(sort) } });
      }
  
      const totalLengthData = await Watch.countDocuments();
  
      const watchData = await Watch.aggregate(aggregatePipeline)
        .skip(Number(skip) || 0)
        .limit(Number(limit) || 12);
  
        if (watchData.length === 0) {
          return res.send({ msg: "No data found",watchData:[]});
        }
                   
      const totalFilteredCount = await Watch.aggregate(aggregatePipeline).count("count");
  
      res.send({
        msg: "Watch data successfully loaded",
        watchData: watchData,
        totalLength: totalLengthData,
        totalFilteredCount: totalFilteredCount[0].count,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({ msg: "Internal Server Error" });
    }
  });

module.exports = {
    watchController
}