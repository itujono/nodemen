import mongoose from "mongoose"



const Schema = mongoose.Schema

// Mulai bikin Schema nya wak
const IdeaSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    },
    createdAt: {
        type: Number,
        default: Date.now
    }
})

const ideasModel = mongoose.model("ideasModel", IdeaSchema)

export default ideasModel
