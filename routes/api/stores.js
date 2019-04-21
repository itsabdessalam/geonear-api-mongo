const router = require("express").Router();
const StoreController = require("../../controllers/StoreController");

router
	.route("/")
	.get(StoreController.index)
	.post(StoreController.store);
router
	.route("/:id([0-9a-fA-F]{24})")
	.get(StoreController.show)
	.put(StoreController.update)
	.delete(StoreController.destroy);

module.exports = router;
