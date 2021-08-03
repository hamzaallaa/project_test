const mongoose = require('mongoose')
const User = require('../models/user')
const Joi = require('joi');
exports.get = async (req, res, next) => {
    try {
        const id = req.query['0'];
        let user;
        if (id) {
            user = await User.find({'_id': id })
        } else {
            user = await User.find();
        }
        res.status(200).json({
            data: user
        })
    } catch (err) {
        res.status(500).send('internal error');
    } 
    next()
}
exports.create = async(req, res, next) => {
    const err = await validate(req.body);
    if (err) return res.status(400).json({ err:err });
    else {
        try {
            let newuser = await User.create(req.body)
            res.status(200).json({
                data:newuser
            })
        } catch (error) {
            res.status(500).send('internal error')
         }
    }
    next()

}
exports.update =async (req, res, next) => {
    const { id } = req.params
    const err = await validate(req.body);
    if (err) return res.status(400).json({ err: err });
    else {
        let user
        try {
             await User.updateOne({ '_id': id }, req.body);
                res.status(200).json({
                    data: req.body
                })
            
        } catch (err) {
            res.status(400).send('id not valide');
        }
    }
    next()
}
exports.delete = async (req, res, next) => {
    const { id } = req.params
    let user
    try {
        user = await User.deleteOne({ '_id': id });
        res.status(200).json({
            data: user
        })

    } catch (err) {
        res.status(400).send('id not valide');
    }
    next()

}

async function validate(user) {
    const schema = Joi.object({
        firstName: Joi.string(),
        lastName: Joi.string(),
        userName: Joi.string(),
        registrationNumber: Joi.string(),
        createdDate: Joi.date(),
        status: Joi.string().valid('En validation', 'Rejeté','Validé'),
    })
    try {
        await schema.validateAsync(user);
    }
    catch (err) {
        return err.details[0].message;
    }
}