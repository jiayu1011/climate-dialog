import mongoose from "mongoose";

const DB_URL = 'mongodb://localhost:27017/climate_dialog'
mongoose.connect(DB_URL).then()

mongoose.connection.on('connected', () => {
    console.log(`mongoose connection open to ${DB_URL}...`)
})
mongoose.connection.on('disconnected', () => {
    console.log(`mongoose connection disconnected!`)
})
mongoose.connection.on('error', (err: any) => {
    console.log(`mongoose connection error: ${err}!!!`)
})

export {
    mongoose
}
