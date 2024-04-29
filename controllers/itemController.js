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
    console.log(allCategories)
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
    body("item_stock", "Stock must not be negative")
    .trim()
    .isFloat({ min: 0 })
    .escape(),
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

/*GET Item details*/
exports.item_detail= asyncHandler(async(req,res,next)=>{
    const item= await Item.findById(req.params.id).populate('category').populate('brand').exec();
    if (item === null) {
        // No results.
        const err = new Error("Item not found");
        err.status = 404;
        return next(err);
    }
    res.render('item_detail',{item:item})
})

/*GET delete item */
exports.item_delete_get=asyncHandler(async(req,res,next)=>{
    const item= await Item.findById(req.params.id,'name').exec();
    if(item===null){
        res.render('/items')
    }
    res.render('item_delete',{item:item})
})
/*POST delete Item*/
exports.item_delete_post=asyncHandler(async(req,res,next)=>{
    console.log(req.body)
    await Item.findByIdAndDelete(req.body.id);
    res.redirect("/items");
})
/*GET Item Edit form*/
exports.item_edit_get=asyncHandler(async(req,res,next)=>{
  const [item,allCategories,allBrands] = await Promise.all([
    Item.findById(req.params.id).populate('category').populate('brand').exec(),
    Category.find().sort({name:1}).exec(),
    Brand.find().sort({name:1}).exec()
  ]) 
  res.render("item_form",{item:item,categories:allCategories,brands:allBrands});
})
/*POST Item Edit Form*/
exports.item_edit_post=[
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
    body("item_stock", "Stock must not be negative")
    .trim()
    .isFloat({ min: 0 })
    .escape(),
    //process to create item
    asyncHandler(async(req,res,next)=>{
        //check if there are errors form form
        const errors = validationResult(req);
        //create new item
        const item = new Item ({
            _id:req.params.id,
            name:req.body.item_name,
            description:req.body.item_description,
            category:req.body.item_category,
            price:req.body.item_price,
            stock:req.body.item_stock,
            brand:req.body.item_brand
        })

        if(!errors.isEmpty()){
                console.log(errors)
                const [allCategories,allBrands] = await Promise.all([
                    Category.find().sort({name:1}).exec(),
                    Brand.find().sort({name:1}).exec()
                ]) 
                res.render('item_form',{item:item,categories:allCategories,brands:allBrands,errors:errors.array()})
                return;
        }else{
            const updatedItem=await Item.findByIdAndUpdate(req.params.id,item,{})
            res.redirect(updatedItem.url)
        }
     })    
]