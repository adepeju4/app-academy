import { Sequelize } from 'sequelize';
import dotenv from "dotenv";
dotenv.config();

const myURI = process.env.URL;
export const sequelize = new Sequelize(myURI, {
  logging: false
});

export const dbConn = async () => {
    try {
      await sequelize.authenticate();
      console.log('Database connection established and tables loaded');
    } catch (error) {
      console.error('Unable to connect to db because of error: ' + error.message);
    }
  };