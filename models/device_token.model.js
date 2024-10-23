import { model, Schema } from "mongoose";

const DeviceTokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    tokens: [
        { type: String }
    ]
}, { timestamps: true })

const DeviceToken = model("DeviceToken", DeviceTokenSchema);
export { DeviceToken }