const router = require('express').Router()
const auth = require('../middleware/auth')
const directoryCtrl = require('../controllers/directoryCtrl')

router.route('/')
        .get(auth, directoryCtrl.getDirectories)
        .post(auth, directoryCtrl.createDirectory)

router.route('/:id')
        .get(auth, directoryCtrl.getDirectory)
        .delete(auth, directoryCtrl.deleteDirectory)

router.route('/:id/notes')
        .get(auth, directoryCtrl.getDirectoryNotes)

module.exports = router