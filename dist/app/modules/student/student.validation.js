"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// Define the Zod schema for UserName
const userNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .max(20, 'FirstName is longer than the maximum allowed length 20')
        .trim()
        .refine((value) => value.charAt(0).toUpperCase() + value.slice(1) === value, {
        message: 'FirstName is not in capitalize format',
    }),
    middleName: zod_1.z.string().optional(),
    lastName: zod_1.z
        .string()
        .refine((value) => /^[A-Za-z]+$/.test(value), {
        message: 'LastName is not valid',
    }),
});
// Define the Zod schema for Guardian
const guardianNameValidationSchema = zod_1.z.object({
    fatherName: zod_1.z.string().min(1),
    fatherOccupation: zod_1.z.string().min(1),
    fatherContact: zod_1.z.string().min(1),
    motherName: zod_1.z.string().min(1),
    motherOccupation: zod_1.z.string().min(1),
    motherContact: zod_1.z.string().min(1),
});
// Define the Zod schema for LocalGuardian
const localGuardianNameValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    occupation: zod_1.z.string().min(1),
    address: zod_1.z.string().min(1),
    contactNo: zod_1.z.string().min(1),
});
// Define the Zod schema for Student
const studentValidationSchema = zod_1.z.object({
    id: zod_1.z.string(),
    password: zod_1.z.string().max(20),
    name: userNameValidationSchema,
    gender: zod_1.z.enum(['male', 'female', 'other']),
    dateOfBirth: zod_1.z.string().optional(),
    email: zod_1.z.string().email(),
    contactNo: zod_1.z.string(),
    emergencyContactNo: zod_1.z.string(),
    bloodGroup: zod_1.z
        .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
        .optional(),
    presentAddress: zod_1.z.string(),
    permanentAddress: zod_1.z.string(),
    guardian: guardianNameValidationSchema,
    localGuardian: localGuardianNameValidationSchema.required(),
    profileImg: zod_1.z.string().optional(),
    isActive: zod_1.z.enum(['active', 'blocked']).default('active'),
    isDeleted: zod_1.z.boolean()
});
exports.default = studentValidationSchema;
