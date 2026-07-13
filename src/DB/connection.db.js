import { Sequelize } from 'sequelize';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from '../../config/config.service.js';

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql'
});


export const checkDBConnection = async () => {
    try {
        await sequelize.authenticate()
        console.log("database connected successfully")
    } catch (error) {
        console.log("failed to connect database", error)
    }
}


export const checkDBSync = async () => {
    try {
        await sequelize.sync({ alter: false, force: false, match: /_test$/ })
        console.log("database sync established successfully")
    } catch (error) {
        console.log("database synchroization failed", error)
    }
}