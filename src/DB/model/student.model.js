import { DataTypes } from "sequelize";
import { sequelize } from "../connection.db.js";

export const studentModel = sequelize.define(
    "Student",     //pluralized by default
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true,
                isLongEnough(value) {
                    if (value.length < 2) {
                        throw new Error("First name must be at least 2 characters long", { cause: { status: 400 } });
                    }
                }
            }
        },
        lastName: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING(100),

        },
        gender: {
            type: DataTypes.ENUM("male", "female"),
            defaultValue: "male"
        },
        fullName: {
            type: DataTypes.VIRTUAL,
            set(value) {
                const [firstName, lastName] = value.split(" ");
                this.setDataValue("firstName", firstName);
                this.setDataValue("lastName", lastName);
            },
            get() {
                return `${this.firstName} ${this.lastName}`;
            }
        },
    },
    {
        freezeTableName: true,
        tableName: "students",     // priority  <<<<
        timestamps: true,
        paranoid: true,
        validate: {
            nameLengthCheck() {
                if (this.firstName.length + this.lastName.length < 4) {
                    throw new Error("Full name is too short", { cause: { status: 400 } });
                }
            },
        },

        hooks: {
            beforeCreate(student) {     //beforeSave => runs on both create and save
                if (student.password && student.password.length < 8) {
                    throw new Error("Password must be at least 8 characters", { cause: { status: 400 } });
                }
            }
        }

    }
);

studentModel.addHook("beforeCreate", "checkPasswordLength", (student) => {
    if (student.password && student.password.length < 8) {
        throw new Error("Password must be at least 8 characters", { cause: { status: 400 } });
    }
}
);


studentModel.beforeCreate((student) => {
    if (student.password && student.password.length < 8) {
        throw new Error("Password must be at least 8 characters", { cause: { status: 400 } });
    }
});


