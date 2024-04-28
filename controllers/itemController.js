const Item= require ('../models/item');
const Category = require('../models/category')
const Brand = require('../models/brand')

const asyncHandler= require('express-async-handler')
const {body, validationResult } = require('express-validator')

/*display all items list*/
exports.items_list=asyncHandler(async(req,res,next)=>{
    const allItems= await Item.find({},' name description').sort({name:1}).exec();

    res.render('items_list',{title:'Items List', items_list: allItems})
})
/*GET The Form to create Item*/
exports.item_create=asyncHandler(async(req,res,next)=>{
    const [allCategories, allBrands]= await Promise.all([
    Category.find({},'name').sort({name:1}).exec(),
    Brand.find({},'name').sort({name:1}).exec()
])
    res.render('item_form',{categories:allCategories, brands: allBrands})
})
/*POST form create item*/
exports.item_create_post=[
    //validate and sanitize the form
    body("item_name", "Name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
    body("item_description", "Description must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
    body("item_price", "Item Should have a price")
    .trim()
    .isFloat({ gt: 1 })
    .escape(),
    body("item_stock", "ISBN must not be empty")
    .trim()
    .isFloat({ min: 0 })
    .escape(),
    body("item_category", "ISBN must not be empty").trim().escape(),
    body("item_brand", "ISBN must not be empty").trim().escape(),

    //process to create item
    asyncHandler(async(req,res,next)=>{
        //check if there are errors form form
        const errors = validationResult(req);
        //create new item
        const item = new Item ({
            name:req.body.item_name,
            description:req.body.item_description,
            category:req.body.item_category,
            price:req.body.item_price,
            stock:req.body.item_stock,
            brand:req.body.item_brand
        })

        if(!errors.isEmpty()){
                console.log('errori')
                console.log(errors)
                next();
        }else{
            await item.save();
            res.redirect('/items')

        }

     })
    
]