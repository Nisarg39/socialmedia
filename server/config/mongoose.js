const mongoose = require("mongoose");

//Old way
// mongoose.connect('mongodb://localhost/socialmedia');
// const db = mongoose.connection;
// // error
// db.on('error',console.error.bind(console,'erroe connecting to db'));
// // up and running then message
// db.once('open',function(){
//     console.log('Success fully connected to the database')
// })

// latest way
main().catch((err) => console.log(err));

async function main() {
  const db = await mongoose.connect("mongodb://localhost/socialmedia");  // LOCAL MONGODB URL "mongodb://localhost/socialmedia"
  if (db) {
    console.log("connected to mongodb");
  }

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
