const mongoose= require('mongoose');
const Schema=mongoose.Schema;

const ItemSchema= new Schema({
    name:{type:String, required:true, maxLength: 300},
    description:{type:String, required:true},
    category:{type:Schema.Types.ObjectId,ref:'Category', required:true},
    price:{type:Number,min:1},
    stock:{type:Number},
    brand:{type:Schema.Types.ObjectId,ref:'Brand',required:true}
});

ItemSchema.virtual('url').get(function(){
    return `/items/${this._id}`
});

module.exports= mongoose.model('Item', ItemSchema)