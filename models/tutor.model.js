import { model, Schema } from "mongoose";
import { BaseUseSchema } from "./user.model.js";
import { hashSync } from "bcrypt";

const TutorSchema = new Schema({
    ...BaseUseSchema.obj,
    password: {
        type: String,
        required: [true, "Password is required."],
        minlength: [6, "Password must be at least of 6 characters."],
        select: false
    },
    bio: {
        type: String,
    },
    categories: [{
        type: Schema.Types.ObjectId,
        ref: "Category"
    }],
    address: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true,
    },
    qualification_doc: {
        public_id: String,
        url: String
    },
    is_verified: {
        type: Boolean,
        default: false
    },
    subjects: [
        {
            type: Schema.Types.ObjectId,
            ref: "Subject"
        },
    ],
    monthly_rate: {
        type: Number,
        default: 999
    },
    demo_video: {
        public_id: String,
        url: String
    },
    exp: {
        type: Number,
        default: 1
    },
    reviews: {
        star: {
            type: Number,
            default: 0
        },
        message: String,
        user: { type: Schema.Types.ObjectId, ref: "User" }
    },
    ratings: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

TutorSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = hashSync(this.password, 10);
        next()
    }
    next()
});


const Tutor = model("Tutor", TutorSchema);

export default Tutor 