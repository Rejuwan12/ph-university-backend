import Joi from "joi";




    // Define the schema for UserName
    const userNameValidationSchema = Joi.object({
        firstName: Joi.string()
          .trim()
          .max(20)
          .regex(/^[A-Z][a-z]*$/, 'capitalize format')
          .required()
          .messages({
            'string.empty': 'FirstName is required',
            'string.max': '{#value} is longer than the maximum allowed length 20',
            'string.pattern.name': '{#value} is not in capitalize format',
          }),
        middleName: Joi.string().optional(),
        lastName: Joi.string()
          .pattern(/^[a-zA-Z]+$/, 'alpha characters only')
          .required()
          .messages({
            'string.empty': 'Last Name is required',
            'string.pattern.name': '{#value} is not valid',
          }),
      });
      
      // Define the schema for Guardian
      const guardianValidationSchema = Joi.object({
        fatherName: Joi.string().required().messages({
          'string.empty': 'Fathers Name is required',
        }),
        fatherOccupation: Joi.string().required().messages({
          'string.empty': 'Father Occupation is required',
        }),
        fatherContact: Joi.string().required().messages({
          'string.empty': 'Father Contact is required',
        }),
        motherName: Joi.string().required().messages({
          'string.empty': 'Mother Name is required',
        }),
        motherOccupation: Joi.string().required().messages({
          'string.empty': 'Mother Occupation is required',
        }),
        motherContact: Joi.string().required().messages({
          'string.empty': 'Mother Contact is required',
        }),
      });
      
      // Define the schema for LocalGuardian
      const localGuardianValidationSchema = Joi.object({
        name: Joi.string().required().messages({
          'string.empty': 'Local guardian name is required',
        }),
        occupation: Joi.string().required().messages({
          'string.empty': 'Local guardian occupation is required',
        }),
        address: Joi.string().required().messages({
          'string.empty': 'Address is required',
        }),
        contactNo: Joi.string().required().messages({
          'string.empty': 'Contact number is required',
        }),
      });
      
      // Define the schema for Student
      const studentValidationSchema = Joi.object({
        id: Joi.string().required().messages({
          'string.empty': 'ID is required',
        }),
        name: userNameValidationSchema.required().messages({
          'any.required': 'Name is required',
        }),
        gender: Joi.string()
          .valid('male', 'female', 'other')
          .required()
          .messages({
            'any.only': 'Gender must be one of male, female, or other',
            'any.required': 'Gender is required',
          }),
        dateOfBirth: Joi.string().optional(),
        email: Joi.string()
          .email()
          .required()
          .messages({
            'string.email': '{#value} is not valid',
            'string.empty': 'Email is required',
          }),
        contactNo: Joi.string().required().messages({
          'string.empty': 'Contact No is required',
        }),
        emergencyContactNo: Joi.string().required().messages({
          'string.empty': 'Emergency Contact No is required',
        }),
        bloodGroup: Joi.string()
          .valid('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-')
          .optional(),
        presentAddress: Joi.string().required().messages({
          'string.empty': 'Present Address is required',
        }),
        permanentAddress: Joi.string().required().messages({
          'string.empty': 'Permanent Address is required',
        }),
        guardian: guardianValidationSchema.required().messages({
          'any.required': 'Guardian is required',
        }),
        localGuardian: localGuardianValidationSchema.required().messages({
          'any.required': 'Local guardian is required',
        }),
        profileImg: Joi.string().optional(),
        isActive: Joi.string()
          .valid('active', 'blocked')
          .default('active')
          .optional(),
      });
      
      export default studentValidationSchema