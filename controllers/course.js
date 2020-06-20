const models = require('../models')
const { validationResult } = require('express-validator')

module.exports = {
    get: {
        create: (req, res, next) => {
            const hbsObject = {
                pageTitle: 'Create Course',
                isLoggedIn: req.cookies['x-auth-token'] !== undefined,
                username: req.user.username
            }
            res.render('create-course.hbs', hbsObject)
        },
        details: (req, res, next) => {
            const { courseId } = req.params


            models.Course.findById(courseId).lean().then(course => {
                const hbsObject = {
                    course,
                    pageTitle: "Course Details",
                    isLoggedIn: req.cookies['x-auth-token'] !== undefined,
                    isCreator: req.user.id.toString() === course.creator.toString(),
                    username: req.user.username
                }


                res.render('details.hbs', hbsObject)
            })
        },
        edit: (req, res, next) => {
            const { courseId } = req.params


            models.Course.findById(courseId).lean().then((course) => {
                const hbsObject = {
                    course,
                    isLoggedIn: req.cookies['x-auth-token'] !== undefined,
                    username: req.user.username
                };

                res.render('edit.hbs', hbsObject)
            })
        },
        delete: (req, res, next) => {
            const { courseId } = req.params;
            models.Course.findByIdAndRemove(courseId).then(deleted => {
                res.redirect('/home/')
            })
        }

    },

    post: {
        create: (req, res, next) => {

            const { title, description, imageUrl, isPublic } = req.body
            const createdAt = new Date()

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.render('create-course.hbs', {
                    message: errors.array()[0].msg,
                    oldInput: req.body
                })
            }

            models.Course.create({ title, description, imageUrl, isPublic: isPublic === "on", createdAt, creator: req.user.id })
                .then((createdCourse) => {
                    res.redirect('/home/')

                })

        },
        edit: (req, res, next) => {
            const { courseId } = req.params
            console.log(courseId)
            const { title, description, imageUrl, isPublic } = req.body
            const isChecked = isPublic === "on"
            models.Course.findByIdAndUpdate(courseId, { title, description, imageUrl, isPublic: isChecked })
                .then((updated) => {
                    res.redirect(`/course/details/${courseId}`)
                })

        }
    }
}