const mongoose = require('mongoose')
async function connect() {
  try {
    await mongoose.connect("your url", {useNewUrlParser: true, useUnifiedTopology: true})
  } catch (error) {
    console.error("Error when connecting to db", error)
  }
}

module.exports = {connect}