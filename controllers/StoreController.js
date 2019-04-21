const Store = require("../models/Store");

module.exports = {
	index: (req, res) => {
		const { p } = req.query;
		let coordinates;
		if (p !== undefined) {
			coordinates = p
				.split(",")
				.map(c => Number(c))
				.reverse();
			Store.findByCoordinates(coordinates, 500).exec((err, calc) => {
				if (err) {
					res.status(500).json({
						error: err
					});
					return;
				}
				res.status(200).send(calc);
			});
		} else {
			Store.findAll().exec((err, stores) => {
				if (err) {
					res.status(500).json({
						error: err
					});
					return;
				}
				res.status(200).send(stores);
			});
		}
	},
	store: (req, res) => {
		const body = req.body;
		const store = new Store(body);
		store.save(err => {
			if (err) {
				res.status(500).json({
					errors: err
				});
				return;
			}
			res.status(201).json(store);
		});
	},
	destroy: (req, res) => {
		Store.findById(req.params.id, (err, store) => {
			if (err) {
				res.status(500).json({
					error: err
				});
				return;
			}
			store.remove(err => {
				if (err) {
					res.status(500).json({
						error: err
					});
					return;
				}

				res.status(204).json({});
			});
		});
	},
	update: (req, res) => {
		const body = req.body;
		Store.findByIdAndUpdate(
			req.params.id,
			{ $set: body },
			{ new: true },
			(err, store) => {
				if (err) {
					res.status(500).json({
						error: err
					});
					return;
				}
				res.status(202).json(store);
			}
		);
	},
	show: (req, res) => {
		Store.findById(req.params.id).exec((err, store) => {
			if (err) {
				res.status(500).json({
					error: err
				});
				return;
			}
			res.status(200).json(store);
		});
	}
};
