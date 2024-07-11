"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
// Define the schema for UserName
const userNameValidationSchema = joi_1.default.object({
    firstName: joi_1.default.string()
        .trim()
        .max(20)
        .regex(/^[A-Z][a-z]*$/, 'capitalize format')
        .required()
        .messages({
        'string.empty': 'FirstName is required',
        'string.max': '{#value} is longer than the maximum allowed length 20',
        'string.pattern.name': '{#value} is not in capitalize format',
    }),
    middleName: joi_1.default.string().optional(),
    lastName: joi_1.default.string()
        .pattern(/^[a-zA-Z]+$/, 'alpha characters only')
        .required()
        .messages({
        'string.empty': 'Last Name is required',
        'string.pattern.name': '{#value} is not valid',
    }),
});
// Define the schema for Guardian
const guardianValidationSchema = joi_1.default.object({
    fatherName: joi_1.default.string().required().messages({
        'string.empty': 'Fathers Name is required',
    }),
    fatherOccupation: joi_1.default.string().required().messages({
        'string.empty': 'Father Occupation is required',
    }),
    fatherContact: joi_1.default.string().required().messages({
        'string.empty': 'Father Contact is required',
    }),
    motherName: joi_1.default.string().required().messages({
        'string.empty': 'Mother Name is required',
    }),
    motherOccupation: joi_1.default.string().required().messages({
        'string.empty': 'Mother Occupation is required',
    }),
    motherContact: joi_1.default.string().required().messages({
        'string.empty': 'Mother Contact is required',
    }),
});
// Define the schema for LocalGuardian
const localGuardianValidationSchema = joi_1.default.object({
    name: joi_1.default.string().required().messages({
        'string.empty': 'Local guardian name is required',
    }),
    occupation: joi_1.default.string().required().messages({
        'string.empty': 'Local guardian occupation is required',
    }),
    address: joi_1.default.string().required().messages({
        'string.empty': 'Address is required',
    }),
    contactNo: joi_1.default.string().required().messages({
        'string.empty': 'Contact number is required',
    }),
});
// Define the schema for Student
const studentValidationSchema = joi_1.default.object({
    id: joi_1.default.string().required().messages({
        'string.empty': 'ID is required',
    }),
    name: userNameValidationSchema.required().messages({
        'any.required': 'Name is required',
    }),
    gender: joi_1.default.string()
        .valid('male', 'female', 'other')
        .required()
        .messages({
        'any.only': 'Gender must be one of male, female, or other',
        'any.required': 'Gender is required',
    }),
    dateOfBirth: joi_1.default.string().optional(),
    email: joi_1.default.string()
        .email()
        .required()
        .messages({
        'string.email': '{#value} is not valid',
        'string.empty': 'Email is required',
    }),
    contactNo: joi_1.default.string().required().messages({
        'string.empty': 'Contact No is required',
    }),
    emergencyContactNo: joi_1.default.string().required().messages({
        'string.empty': 'Emergency Contact No is required',
    }),
    bloodGroup: joi_1.default.string()
        .valid('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-')
        .optional(),
    presentAddress: joi_1.default.string().required().messages({
        'string.empty': 'Present Address is required',
    }),
    permanentAddress: joi_1.default.string().required().messages({
        'string.empty': 'Permanent Address is required',
    }),
    guardian: guardianValidationSchema.required().messages({
        'any.required': 'Guardian is required',
    }),
    localGuardian: localGuardianValidationSchema.required().messages({
        'any.required': 'Local guardian is required',
    }),
    profileImg: joi_1.default.string().optional(),
    isActive: joi_1.default.string()
        .valid('active', 'blocked')
        .default('active')
        .optional(),
});
exports.default = studentValidationSchema;
