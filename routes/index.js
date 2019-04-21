const router = require("express").Router();
const prefix = "v1";

router.use(`/api/${prefix}`, require("./api"));
module.exports = router;
