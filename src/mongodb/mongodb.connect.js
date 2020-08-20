const mongoose = require('mongoose')

async function connect() {


    const uri = "mongodb+srv://dev:<password>@node-jest.xf1k0.mongodb.net/<database>?retryWrites=true&w=majority";


    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (err) {
        console.log(err);
        console.log("Err in connecting database");
    }

}
module.exports = { connect }