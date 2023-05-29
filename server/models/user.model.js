import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";

export const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
          msg: 'The password should contain at least one letter, one number, and one special character',
        },
      },
    },
  },
  { timestamps: true, createdAt: "created_at", updatedAt: "updated_at" }
);

const syncdb = async () => {
  await User.sync();
};

syncdb();
