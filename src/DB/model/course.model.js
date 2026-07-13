import { DataTypes } from "sequelize";
import { sequelize } from "../connection.db.js";
import { studentModel } from "./student.model.js";

export const courseModel = sequelize.define(
    "Course",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false
        },

        code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        tableName: "courses",
        timestamps: true
    }
);


studentModel.belongsToMany(courseModel, {
    through: "student_courses"
});

courseModel.belongsToMany(studentModel, {
    through: "student_courses"
});
