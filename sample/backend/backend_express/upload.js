const multer = require('multer');
const fileExtension = require('file-extension')

// Configure Storage
const storage = multer.diskStorage({

    // Setting directory on disk to save uploaded files
    destination: function (req, file, cb) {
        cb(null, 'image')
    },

    // Setting name of file saved
    filename: function (req, file, cb) {
        const fileName = file.fieldname + '-' + Date.now() + '.' + fileExtension(file.originalname)
        req.filePath = fileName
        cb(null, fileName)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        // Setting Image Size Limit to 2MBs
        fileSize: 2000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            //Error 
            cb(new Error('Please upload JPG and PNG images only!'))
        }
        //Success 
        cb(undefined, true)
    }
})

module.exports = {
    upload,
    storage
}