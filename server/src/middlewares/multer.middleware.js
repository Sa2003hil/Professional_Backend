import multer from 'multer';

// diskStorage: A storage engine for multer which gives you full control on storing files to disk.

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // cb(null, file.fieldname + '-' + uniqueSuffix)
        cb(null, file.originalname)
    }
})

// this will give the local path of the file

export const upload = multer({
    storage: storage
})