import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import express from 'express';
import dotenv from "dotenv";
import User, { Admin } from "./models/user.model.js";
import Tutor from "./models/tutor.model.js";
import * as AdminJsMongoose from "@adminjs/mongoose";
import mongoose from 'mongoose';
import { Subject } from "./models/subject.model.js"
import { Notification } from "./models/notification.model.js"
import { Category } from "./models/category.model.js"
import { Session } from "./models/session.model.js"
import { compareSync } from 'bcrypt';

dotenv.config()
const app = express()

const PORT = process.env.PORT;
const DB_URL = process.env.MONGO_URI;
const DEFAULT_ADMIN = {
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
}

AdminJS.registerAdapter(AdminJsMongoose)

const admin = new AdminJS({
    resources: [
        {
            resource: User
        },
        {
            resource: Tutor
        },
        {
            resource: Admin
        },
        {
            resource: Subject
        },
        {
            resource: Category
        },
    ],
    branding: {
        companyName: "Tutor Dunia",
        logo: "",
        favicon: "https://res.cloudinary.com/dirdehr7r/image/upload/f_auto,q_auto/zs85ytgsr7kn6coztjwn",
        withMadeWithLove: false
    },
})

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(admin, {
    authenticate: async (email, password) => {
        const user = await Admin.findOne({ email });
        if (!user) {
            return null
        }
        const ispassOk = compareSync(password, user.password);

        if (!ispassOk) {
            return null
        }

        return user
    },
    cookieName: 'adminjs',
    cookiePassword: 'somepassword',
})
app.use(admin.options.rootPath, adminRouter);







const start = async () => {
    try {
        const db = await mongoose.connect(DB_URL);
        if (db.connection.host) {
            console.log(`Database connected to : ${db.connection.host}`)
            app.listen(PORT, () => {
                console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
            })
        }
    } catch (error) {
        console.log(`Unable to start server due to : ${error.message}`)
    }


}
start()


