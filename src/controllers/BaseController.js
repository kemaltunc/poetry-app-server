
const Response = require('../utils/BaseResponse')
const APIFeatures = require('../utils/ApiFeatures')
const User = require('../models/UserModel')

exports.createOne = Model => async (req, res, next) => {
    try {
        const doc = await Model.create(req.body)

        if (!doc) {
            new Response(res).successBoolean(false)
        } else {
            new Response(res).successBoolean(true)
        }


    } catch (error) {
        next(error)
    }
}

exports.getOne = Model => async (req, res, next) => {
    try {
        const doc = await Model.findById(req.params.id)

        if (!doc) {
            return new Response(res).error("Kayıt bulunamadı")
        }
        return doc
    } catch (error) {
        next(error);
    }
}

exports.getAll = async (Model, req, res, next) => {
    try {
        const features = new APIFeatures(Model.find().populate('user', 'name surname'), req.query).sort().paginate()
        const doc = await features.query
        return doc

    } catch (error) {
        next(error)
    }
}
