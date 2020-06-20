const { body } = require('express-validator')

module.exports = [
    body('title', 'Title should be at least 5 symbols')
        .isLength({ min: 5 }),
    body('description', 'Description is too long!')
        .isLength({ max: 50 }),
    body('imageUrl')
        .custom((value) => {
            if (!value.startsWith('http')) {
                throw new Error("Please enter a valid image url")
            }
            return true
        })

]