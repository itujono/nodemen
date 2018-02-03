import mongoose from "mongoose"

const Schema = mongoose.Schema



const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const usersModel = mongoose.model("usersModel", UserSchema)

export default usersModel