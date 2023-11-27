const Category = require('../../models/categories')
exports.add = async (req, res) => {
    const { name } = req.body
    try {
        if (!name || name == ' ') {
            return res.json({
                status: false,
                message: 'Category name is required'
            })
        }
        const category = new Category({ name });
        await category.save();
        res.json({
            status: true,
            message: 'Category saved',
            result:category
        })
    } catch (error) {
        res.json({
            status: false,
            message: 'Server side error'
        })
    }
}
exports.update = async (req, res) => {
    const { name, _id } = req.body
    try {
        if (!_id) {
            return res.json({
                status: false,
                message: '_id is required'
            })
        }
        const category = await Category.findById(_id);
        if (!category) {
            return res.json({
                status: false,
                message: 'Category with this id does not exsists'
            })
        }
        category.name = name;
        let savedCategory = await Category.findByIdAndUpdate(_id, category, { new: true });
        res.json({
            status: true,
            message: 'Category saved',
            result:savedCategory
        })
    } catch (error) {
        res.json({
            status: false,
            message: 'Server side error'
        })
    }
}
exports.get = async (req, res) => {
    const { page, limit, _id } = req.query;
    try {
        let result;
        if (!_id) {
            if (!page || !limit) {
                result = await Category.find({}).sort({ _id: -1 });
            } else {
                result = await Category.find({}).sort({ _id: -1 }).limit(limit).skip(limit * page)
            }
        } else {
            result = await Category.findById(_id)
        }
        res.json({
            status: true,
            message: 'Fetched',
            result: result
        })
    } catch (error) {
        res.json({
            status: false,
            message: 'Server side error'
        })
    }
}
exports.delete = async (req, res) => {
    const { _id } = req.query;
    try {
        if (!_id) {
            return res.json({
                status: false,
                message: '_id is required'
            })
        }
        const category = await Category.findByIdAndDelete({ _id })
        if (!category) {
            return res.json({
                status: false,
                message: 'Category not found'
            })
        }
        res.json({
            status: true,
            message: 'Category deleted',
            result: category
        })
    } catch (error) {
        res.json({
            status: false,
            message: 'Server side error'
        })
    }
}