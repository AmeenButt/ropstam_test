const Car = require('../../models/car')
exports.add = async (req, res) => {
    const { name, color, model, make, year, regNo, category } = req.body
    try {
        if (!name || !color || !model || !make || !year || !regNo || !category) {
            return res.json({
                status: false,
                message: 'name, color,model,make,year,regNo,category are required'
            })
        }
        const car = new Car({ name, color, model, make, year, regNo, category });
        await car.save();
        res.json({
            status: true,
            message: 'Car saved',
            result: car
        })
    } catch (error) {
        res.json({
            status: false,
            message: 'Server side error'
        })
    }
}
exports.update = async (req, res) => {
    const { name, color, model, make, year, regNo, category, _id } = req.body
    try {
        if (!_id) {
            return res.json({
                status: false,
                message: '_id is required'
            })
        }
        const car = await Car.findById(_id);
        if (!car) {
            return res.json({
                status: false,
                message: 'Car with this id does not exsists'
            })
        }
        if(name){
            car.name = name;
        }
        if(color){
            car.color = color;
        }
        if(model){
            car.model = model;
        }
        if(make){
            car.make = make;
        }if(year){
            car.year = year;
        }if(regNo){
            car.regNo = regNo;
        }
        if(category){
            car.category = category;
        }
        let savedCar = await Car.findByIdAndUpdate(_id, car, { new: true });
        res.json({
            status: true,
            message: 'Car saved',
            result: savedCar
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
                result = await Car.find({}).populate('category').sort({ _id: -1 });
            } else {
                result = await Car.find({}).populate('category').sort({ _id: -1 }).limit(limit).skip(limit * page)
            }
        } else {
            result = await Car.findById(_id).populate('category')
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
        const car = await Car.findByIdAndDelete({ _id })
        if (!car) {
            return res.json({
                status: false,
                message: 'Car not found'
            })
        }
        res.json({
            status: true,
            message: 'Car deleted',
            result: car
        })
    } catch (error) {
        res.json({
            status: false,
            message: 'Server side error'
        })
    }
}