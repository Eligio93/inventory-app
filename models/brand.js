const mongoose= require('mongoose')
const Schema=mongoose.Schema;

const BrandSchema= new Schema({
    name:{type:String, required:true,minLength:3, maxLength: 100}
});

BrandSchema.virtual('url').get(function(){
    return `/brands/${this._id}`
});

module.exports= mongoose.model('Brand', BrandSchema)