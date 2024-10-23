import { hashSync } from "bcrypt";
import { model, Schema } from "mongoose";

const BaseUseSchema = new Schema({
    full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: [true, "Email already exists."]
    },
    avatar: {
        public_id: String,
        url: String
    },
    email_verified: {
        type: Boolean,
        default: false
    },
    email_verification: {
        otp: Number,
        expiry: Date
    },

});



const UserSchema = new Schema({
    ...BaseUseSchema.obj,
    password: {
        type: String,
        required: [true, "Password is required."],
        minlength: [6, "Password must be at least of 6 characters."],
        select: false
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
        minlength: [10, "Phone number at least of 10 digit."]
    },
    phone_verified: {
        type: Boolean,
        default: false
    },
    phone_verification: {
        otp: Number,
        expiry: Date
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }

}, { timestamps: true });

UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = hashSync(this.password, 10);
        next()
    }
    next()
});


const adminSchema = new Schema({
    full_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })


adminSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = hashSync(this.password, 10);
        next()
    }
    next()
});
const Admin = model("Admin", adminSchema)



const User = model("User", UserSchema);

export { BaseUseSchema, Admin }

export default User