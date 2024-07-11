import { z } from 'zod';


// Define the Zod schema for UserName
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, 'FirstName is longer than the maximum allowed length 20')
    .trim()
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      {
        message: 'FirstName is not in capitalize format',
      },
    ),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: 'LastName is not valid',
    })
    ,
});

// Define the Zod schema for Guardian
const guardianNameValidationSchema = z.object({
  fatherName: z.string().min(1),
  fatherOccupation: z.string().min(1),
  fatherContact: z.string().min(1),
  motherName: z.string().min(1),
  motherOccupation: z.string().min(1),
  motherContact: z.string().min(1),
});

// Define the Zod schema for LocalGuardian
const localGuardianNameValidationSchema = z.object({
  name: z.string().min(1),
  occupation: z.string().min(1),
  address: z.string().min(1),
  contactNo: z.string().min(1),
});

// Define the Zod schema for Student
const studentValidationSchema = z.object({
  id: z.string(),
  password: z.string().max(20),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string().optional(),
  email: z.string().email(),
  contactNo: z.string(),
  emergencyContactNo: z.string(),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
    .optional(),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  guardian: guardianNameValidationSchema,
  localGuardian: localGuardianNameValidationSchema.required(),
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted:z.boolean()
});


export default studentValidationSchema;