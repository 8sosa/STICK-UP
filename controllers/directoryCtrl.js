const Directories = require('../models/directoryModel')
const Notes = require('../models/noteModel')

const directoryCtrl = {
    getDirectories: async (req, res) =>{
        try {
            const directories = await Directories.find({user_id: req.user.id})
            res.json(directories)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createDirectory: async(req, res) =>{
        try {
            const { name } = req.body;
            const newDirectory = new Directories({
                name,
                user_id: req.user.id
            });
            const check = await Directories.findOne({name: name, user_id: req.user.id})
            if (check == null){
                await newDirectory.save()
                res.json({msg: "Folder added"})
            } else {res.json({msg: 'Directory already exists!'})}
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteDirectory: async (req, res) =>{
        try {
            await Directories.findByIdAndDelete(req.params.id)
            res.json({msg: "Folder deleted"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getDirectory: async (req, res) => {
        try {
            const directory = await Directories.findById(req.params.id)
            res.json(directory)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getDirectoryNotes: async (req, res) =>{
        try {
            const directoryNotes = await Notes.find({directory: req.params.id})
            res.json(directoryNotes)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = directoryCtrl