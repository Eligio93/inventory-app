#! /usr/bin/env node

console.log(
    'This script populates some test items, categories and brands to the database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Item = require("./models/item");
  const Category = require('./models/category')
  const Brand = require("./models/brand");

  
  const items = [];
  const categories = [];
  const brands = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createCategories();
    await createBrands();
    await createItems();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  // We pass the index to the ...Create functions so that, for example,
  // genre[0] will always be the Fantasy genre, regardless of the order
  // in which the elements of promise.all's argument complete.
  async function categoryCreate(index, name, description) {
    const category = new Category({ name: name, description: description});
    await category.save();
    categories[index] = category;
    console.log(`Added category: ${name}`);
  }
  
  async function brandCreate(index, name) {
    const brand= new Brand({name:name})  
    await brand.save();
    brands[index] = brand;
    console.log(`Added brand: ${name}`);
  }
  
  async function itemCreate(index, name, description, category, price, stock, brand) {
    const itemDetail = {
      name:name,
      description: description,
      category: category,
      price: price,
      stock: stock,
      brand: brand
    };
  
    const item = new Item(itemDetail);
    await item.save();
    items[index] = item;
    console.log(`Added item: ${name}`);
  }
  

  async function createCategories() {
    console.log("Adding categories");
    await Promise.all([
      categoryCreate(0, "Perfumes",'Perfumes for her and for him'),
      categoryCreate(1, "Shampoo", 'Transform your haircare routine with our rejuvenating shampoo, delivering nourishment and vitality in every wash.'),
      categoryCreate(2, "Shower Gel", 'Elevate your shower experience with our invigorating shower gel, leaving your skin refreshed and revitalized.'),
    ]);
  }
  
  async function createBrands() {
    console.log("Adding brands");
    await Promise.all([
      brandCreate(0, "Creed"),
      brandCreate(1, "Breeze"),
      brandCreate(2, "Reuzel"),
      brandCreate(3, "Alfaparf"),
      brandCreate(4, "American Crew"),
    ]);
  }
  
  async function createItems() {
    console.log("Adding Items");
    await Promise.all([
      itemCreate(0,
        "Cipresso Nobile Eau de Parfum 100ml",
        '"Tall and blunt", the Cypress tree protects the immortal beauty of Bolgheri. The excellence of the cypress together with water notes reveals hints of lavender then dissolving in a precious fresh trail. Acqua di Bolgheri Cipresso Nobile fragrance main notes are: cypress, bergamot and water notes, lily of the valley and lavender, sclarea sage and sweet wood.',
        categories[0],
        58,
        20,
        brands[0]
      ),
      itemCreate(1,
        "Sapone Doccia",
        '"Tall and blunt", the Cypress tree protects the immortal beauty of Bolgheri. The excellence of the cypress together with water notes reveals hints of lavender then dissolving in a precious fresh trail. Acqua di Bolgheri Cipresso Nobile fragrance main notes are: cypress, bergamot and water notes, lily of the valley and lavender, sclarea sage and sweet wood.',
        categories[2],
        58,
        20,
        brands[1]
      ),
      itemCreate(2,
        "Shampoo delicato",
        '"Tall and blunt", the Cypress tree protects the immortal beauty of Bolgheri. The excellence of the cypress together with water notes reveals hints of lavender then dissolving in a precious fresh trail. Acqua di Bolgheri Cipresso Nobile fragrance main notes are: cypress, bergamot and water notes, lily of the valley and lavender, sclarea sage and sweet wood.',
        categories[1],
        58,
        20,
        brands[2]
      ),
      itemCreate(3,
        "Altro shampoo delicato",
        '"Tall and blunt", the Cypress tree protects the immortal beauty of Bolgheri. The excellence of the cypress together with water notes reveals hints of lavender then dissolving in a precious fresh trail. Acqua di Bolgheri Cipresso Nobile fragrance main notes are: cypress, bergamot and water notes, lily of the valley and lavender, sclarea sage and sweet wood.',
        categories[1],
        58,
        20,
        brands[3]
      ),
      itemCreate(4,
        "ERolfa",
        '"Tall and blunt", the Cypress tree protects the immortal beauty of Bolgheri. The excellence of the cypress together with water notes reveals hints of lavender then dissolving in a precious fresh trail. Acqua di Bolgheri Cipresso Nobile fragrance main notes are: cypress, bergamot and water notes, lily of the valley and lavender, sclarea sage and sweet wood.',
        categories[0],
        58,
        20,
        brands[4]
      )
    ]);
  }
