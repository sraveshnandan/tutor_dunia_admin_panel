import { model, Schema } from "mongoose";

const SubjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    icon: {
        public_id: String,
        url: String
    }
}, { timestamps: true });

const Subject = model("Subject", SubjectSchema);


export { Subject }