const Sample = require("../model/Sample.model");

module.exports = {
  getSamples: (req, res, next) => {
    res.status(200).json({ sucess: true, msg: "Get Samples" });
    next();
  },
  createSample: async (req, res, next) => {
    try {
      const sample = await Sample.create(req.body);
      if (!sample) {
        res.status(400).json({ sucess: false, msg: "error in upload" });
      }
      res.status(201).json({ sucess: true, data: sample });
    } catch (error) {
      console.log(error);
    }

    // // const { slug, name, email, role, password } = req.body;
    // const { title } = req.body;
    // const sample = await Sample.create({ title });
    // // const sample = await Sample({ slug, name, role, password });
    // // const sample = await newSample.save(req.body);
    // // res.status(201).json({ sucess: true, data: sample });
    // // // res.status(200).json({ sucess: true, msg: "Sample Created" });
    // console.log(req.body, sample);
    next();
  },
};
