import { studentModel } from '../../DB/model/index.js'

export const signup = async (inputs) => {
    const { fullName, email, password } = inputs
    const checkEmail = await studentModel.findOne({
        where: {
            email
        }
    })
    if (checkEmail) {
        throw new Error("Email already exists", { cause: { status: 409 } })
    }
    const student = await studentModel.create({ fullName, email, password }, { validate: false })
    return student
}

export const login = async (inputs) => {
    const { email, password } = inputs
    const student = await studentModel.findOne({
        where: {
            email, password
        },
        attributes: {
            exclude: ['id', 'password', 'deletedAt'],
        }
    })
    if (!student) {
        throw new Error("Student not found", { cause: { status: 409 } })
    }

    return student
}

// Skips N rows before starting to return results
// Zero-based index:
// offset: 0 → start at the first row
// offset: 1 → skip the first row, start at the second
export const getAllStudents = async () => {
    // const students = await studentModel.findAll({ attributes: { exclude: ['password', 'deletedAt'] } });

    const students = await studentModel.findAndCountAll({ offset: 0, limit: 1, attributes: { exclude: ['password', 'deletedAt'] } });
    return students
};


export const updateStudent = async (id, inputs) => {
    // const student = await studentModel.findByPk(id, { attributes: { exclude: ['password'] } });

    const student = await studentModel.update(inputs, { where: { id } });
    if (!student[0]) {
        throw new Error("Student not found", { cause: { status: 404 } });
    }
    return student
};


export const deleteStudent = async (id) => {
    const student = await studentModel.destroy({ where: { id }, force: true });
    if (!student) {
        throw new Error("Student not found", { cause: { status: 404 } });
    }
    return student
};

