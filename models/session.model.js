import { model, Schema } from "mongoose";

const SessionSchema = new Schema({

}, { timestamps: true })


const Session = model("Session", SessionSchema);

export { Session }