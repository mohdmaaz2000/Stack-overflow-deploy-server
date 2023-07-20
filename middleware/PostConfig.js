const multer = require('multer')


// Configuration for user profile
const ProfileStorage = multer.diskStorage({
    destination: './public/Profilephoto', //directory (folder) setting
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname) // file name setting
    }
});

let uploadProfile = multer({
    storage: ProfileStorage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == 'image/jpeg' ||
            file.mimetype == 'image/jpg' ||
            file.mimetype == 'image/png'
        ) {
            cb(null, true)
        }
        else {
            cb(null, false);
            cb(new Error('Only jpeg,  jpg , png, and gif Image allow'))
        }
    }
});


// configuration for user post 
const PostStorage = multer.diskStorage({
    destination: './public/UserPost', //directory (folder) setting
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname) // file name setting
    }
});

let uploadPost = multer({
    storage: PostStorage,
});

module.exports = { uploadProfile, uploadPost };