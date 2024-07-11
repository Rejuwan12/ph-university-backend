"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentControllers = void 0;
const student_service_1 = require("./student.service");
const student_validation_1 = __importDefault(require("./student.validation"));
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { student: studentData } = req.body;
        // // data validate using joi
        //  const{error,value} = studentValidationSchema.validate(studentData);
        // Data Validation Using Zod
        const zodParseData = student_validation_1.default.parse(studentData);
        // will call service func to send this data
        const result = yield student_service_1.studentServices.createStudentIntoDB(zodParseData);
        //  if(error){
        //   res.status(500).json({
        //     success: false,
        //     massage: 'Something Went Wrong',
        //     error:error.details
        //   })
        //  }
        // send response
        res.status(200).json({
            success: true,
            massage: 'Student is Created Successfully',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            massage: err.message || 'Something Went Wrong',
            error: err,
        });
    }
});
const getAllStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield student_service_1.studentServices.getAllStudentsFromDB();
        res.status(200).json({
            success: true,
            massage: 'Students is retrieved Successfully',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            massage: err.message || 'Something Went Wrong',
            error: err,
        });
    }
});
const getSingleStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.params;
        const result = yield student_service_1.studentServices.getSingleStudentFromDB(studentId);
        res.status(200).json({
            success: true,
            massage: 'Students is retrieved Successfully',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            massage: err.message || 'Something Went Wrong',
            error: err,
        });
    }
});
const deleteStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.params;
        const result = yield student_service_1.studentServices.deleteStudentsFromDB(studentId);
        res.status(200).json({
            success: true,
            massage: 'Students is deleted Successfully',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            massage: err.message || 'Something Went Wrong',
            error: err,
        });
    }
});
exports.studentControllers = {
    createStudent,
    getAllStudents,
    getSingleStudents,
    deleteStudents
};
