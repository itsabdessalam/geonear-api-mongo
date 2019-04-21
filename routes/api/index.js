const router = require("express").Router();
router.use("/stores", require("./stores"));
module.exports = router;
