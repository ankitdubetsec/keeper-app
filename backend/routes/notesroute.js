const express=require('express')
const router=express.Router()
const { Note } =require('../models/notemodel.js')
// import { getallnotes } from '../controllers/notes.js'
const {
  
    getallnotes,
    createnote,
    getnote,
    deletenote,
    updatenote
  } = require('../controllers/notes.js')

router.post('/', createnote)

router.patch('/:id',updatenote)

router.get('/',getallnotes )

router.get('/:id', getnote)


router.delete('/:id',deletenote )

module.exports=router