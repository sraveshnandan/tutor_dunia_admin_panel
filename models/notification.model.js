import { model, Schema } from "mongoose";

const NotificationSchema = new Schema({
    title: { type: String, required: true },
    desc: { type: String },
    reciver: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    is_read: { type: Boolean, default: false }
}, { timestamps: true });


const Notification = model("Notification", NotificationSchema);

export { Notification }