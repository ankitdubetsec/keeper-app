const mongoose=require('mongoose')
const noteschema=new mongoose.Schema(
    {
       
        // title:{
        //     type:String,
        //     required:true,
        // },
        // content:{
        //     type:String,
        //     required:true,
        // }
        title:{
            type:String,
            required: [true, 'must provide name'],
            // maxlength:5,
        },
        content:{
            type:String,
            required: [true, 'must provide content'],
        },
        completed:{
            type:Boolean,
            default:false,
        }

        
    }  
)

 const Note=mongoose.model('note',noteschema)
 module.exports=Note