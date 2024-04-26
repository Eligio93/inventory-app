const Item= require ('../models/item')

const asyncHandler= require('express-async-handler')

/*display all items list*/
exports.items_list=asyncHandler(async(req,res,next)=>{
    const allItems= await Item.find({}).sort({name:1}).exec();
    console.log(allItems)

    res.render('items_list',{title:'Items List', items_list: allItems})
})