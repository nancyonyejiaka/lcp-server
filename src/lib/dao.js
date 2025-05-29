const wrapModel = (Model) => ({
	create: (doc, opts) => Model.create(doc, opts),
	findAll: (filter = {}, proj = null) => Model.find(filter, proj).lean(),
	findById: (id) => Model.findById(id).lean(),
	updateById: (id, patch) => Model.findByIdAndUpdate(id, patch, { new: true }),
	removeById: (id) => Model.findByIdAndDelete(id),
});

export default wrapModel;
