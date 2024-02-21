const Note=require('../models/notemodel')
const getallnotes=async (req, res) => {
    // try {
    //     const notes = await Note.find({})
    //     return res.status(200).json({
    //         count: notes.length,
    //         data: notes
    //     })
    // } catch (error) {
    //     console.log(error.message)

    // }
    try {
        const notes= await Note.find({});
        res.status(200).json({note:notes})
    } catch (error) {
        res.status(500).json({msg:"an error occured"})
    }
}
const createnote=async (req, res) => {
    // try {
    //     if (!req.body.title || !req.body.content) {
    //         return res.status(400).send({ message: "send all the details" })
    //     }
        
    //     const newnote = {
    //         title: req.body.title,
    //         content: req.body.content,
           
    //     }

    //     const note = await Note.create(newnote)
    //     return res.status(201).send(note)
    // } catch (error) {
    //     console.log(error.message)
    // }
    try {
        const newnote=await Note.create(req.body)
    res.status(200).json(newnote);
    } catch (error) {
        res.status(500).json({msg:error})
    }
    
}
const updatenote= async (req, res) => {
    // try {
    //     if (!req.body.title || !req.body.content) {
    //         return res.status(400).send({ message: "send all the details" })
    //     }
    //     const { id } = req.params

    //     const note = await Note.findByIdAndUpdate(id, req.body)
    //     return res.status(201).send(note)
    // } catch (error) {
    //     console.log(error.message)
    // }
    // res.send("updatenote here")

    try {
        const {id:taskid} =req.params
        const note=await Note.findOneAndUpdate({_id:taskid},req.body,{
            new:true,
            runValidators:true,
        })
        if(!note){
            return res.status(404).json({msg:"no such note"})
        }

        res.status(200).json({noteupdated:note})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}
const deletenote=async (req, res) => {
    
    // try {
    //     const { id } = req.params
    //     const notes = await Note.findByIdAndDelete(id)
    //     if (!notes) {
    //         return res.status(404).json({ message: 'Book not found' });
    //       }
      
    //       return res.status(200).send({ message: 'Book deleted successfully' });

    // } catch (error) {
    //     console.log(error.message)
    //     res.status(500).send({ message: error.message });

    // }
    // res.send("note deleted")
    try {
        const {id:noteid}=req.params;
        const note=await Note.findOneAndDelete({_id:noteid},req.body)
        if(!note)
        {
            return res.status(404).json({msg:`no note with id ${noteid}`})
        }
        res.status(200).json({note})
    } catch (error) {
        res.status(500).json({mssg:error})
    }
}
const getnote=async (req, res) => {
    // const { id } = req.params
    // try {
    //     const notes = await Note.findById(id)
    //     return res.status(200).json(notes)
    // } catch (error) {
    //     console.log(error.message)

    // }
    // res.send(req.params.id)
    try {
        const {id:noteid}=req.params;
        const note=await Note.findOne({_id:noteid})
        if(!note)
        {
            return res.status(404).json({msg:`no note with id ${noteid}`})
        }
        res.status(200).json({note})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

module.exports={
    getallnotes,
    createnote,
    updatenote,deletenote,getnote,
}