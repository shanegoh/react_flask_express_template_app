
const db = require('../models/index.js')

const Image = db.image

// Image Repo
const findEmployeeImageByUsername = (username) => {
    return Image.findOne({
        where: {
            username: username
        }
    })
};

const updateInsertEmployeeImageRecord = (username, filePath) => {
    return Image.upsert({
        username: username,
        path: filePath
    })
};

module.exports = {
    findEmployeeImageByUsername,
    updateInsertEmployeeImageRecord
}