import { courseModel } from "../../DB/model/course.model.js";
import { studentModel } from "../../DB/model/student.model.js";

export const addCourse = async (inputs) => {
    const { title, code } = inputs;

    const exists = await courseModel.findOne({ where: { code } });
    if (exists) {
        throw new Error("Course already exists", { cause: { status: 404 } });
    }

    return await courseModel.create({ title, code });
};


export const getAllCourses = async () => {
    return await courseModel.findAll();
};

// magic methods [enroll - studentCourses - courseStudents - unenroll]
export const enrollInCourse = async (inputs) => {
    const { studentId, courseId } = inputs
    const student = await studentModel.findByPk(studentId);
    if (!student) throw new Error("Student not found", { cause: { status: 404 } });

    const course = await courseModel.findByPk(courseId);
    if (!course) throw new Error("Course not found", { cause: { status: 404 } });

    return await student.addCourse(course);
};


//getCourses reads from the junction table and joins courses.
export const getStudentCourses = async (studentId) => {
    const student = await studentModel.findByPk(studentId);
    if (!student) throw new Error("Student not found", { cause: { status: 404 } });

    const courses = await student.getCourses();

    // NOT WORKING
    // const courses = await student.getCourses({ through: { attributes: [] } });
    // const courses = await student.getCourses({
    //     attributes: ["id", "title", "code"],
    //     through: {
    //         attributes: { include: ["createdAt"] }
    //     }
    // });
    return courses;
};


// This shows all students enrolled in one course.
export const getCourseStudents = async (courseId) => {
    const course = await courseModel.findByPk(courseId);
    if (!course) throw new Error("Course not found", { cause: { status: 404 } });

    const students = await course.getStudents();
    return students;
};


// removeCourse deletes a row from student_courses.
export const unenrollStudent = async (inputs) => {
    const { studentId, courseId } = inputs;
    const student = await studentModel.findByPk(studentId);
    if (!student) throw new Error("Student not found", { cause: { status: 404 } });

    const course = await courseModel.findByPk(courseId);
    if (!course) throw new Error("Course not found", { cause: { status: 404 } });


    const result = await student.removeCourse(course);

    if (!result) {
        throw new Error("No enrollment found for this student in this course", { cause: { status: 404 } });
    }
    return result
};


// join two tables
export const getStudentWithCourses = async (id) => {
    const student = await studentModel.findByPk(id, {
        attributes: ["id", "firstName", "lastName"],
        include: {
            model: courseModel,
            attributes: ["title", "code"],
            through: { attributes: [] } // hide junction table
        }
    });
    if (!student) {
        throw new Error("Student not found", { cause: { status: 404 } });
    }
    return student
};


export const getCourseWithStudents = async (courseId) => {
    const course = await courseModel.findByPk(courseId, {
        attributes: ["id", "title", "code"],
        include: {
            model: studentModel,
            attributes: ["id", "firstName", "lastName"],
            through: { attributes: [] } // hide junction table
        }
    });

    if (!course) {
        throw new Error("Course not found", { cause: { status: 404 } });
    }
    return course;
};





