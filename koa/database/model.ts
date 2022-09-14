import { mongoose } from './db'
import { USER_AVATAR_URL } from "../config/config";

const dialogSchema = new mongoose.Schema({
    "isRobot": {
        type: Boolean,
        default: false
    },
    "avatar": {
        type: String,
        default: USER_AVATAR_URL
    },
    "content": {
        type: String,
        default: ''
    },
    "time": {
        type: String,
        default: ''
    }
})

export const dialogModel = mongoose.model('dialogs', dialogSchema)

