const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log('DB Connected Successfuly: ', connect.connection.host, connect.connection.name);
  } catch(error) {
    console.log('DB Error', error)
    process.exit();
  }
}

module.exports = dbConnect;