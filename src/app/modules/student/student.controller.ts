import { Request, Response } from 'express';
import { TStudent } from './student.interface';
import { studentServices } from './student.service';
import Joi from 'joi';

import { z } from 'zod';
import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    // // data validate using joi
    //  const{error,value} = studentValidationSchema.validate(studentData);

    // Data Validation Using Zod

    const zodParseData = studentValidationSchema.parse(studentData);

    // will call service func to send this data
    const result = await studentServices.createStudentIntoDB(zodParseData);
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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      massage: err.message || 'Something Went Wrong',
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      massage: 'Students is retrieved Successfully',
      data: result,
    });
  } catch (err:any) {
    res.status(500).json({
      success: false,
      massage: err.message || 'Something Went Wrong',
      error: err,
    });
  }
};
const getSingleStudents = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      massage: 'Students is retrieved Successfully',
      data: result,
    });
  } catch (err : any) {
    res.status(500).json({
      success: false,
      massage: err.message || 'Something Went Wrong',
      error: err,
    });
  }
};
const deleteStudents = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.deleteStudentsFromDB(studentId);
    res.status(200).json({
      success: true,
      massage: 'Students is deleted Successfully',
      data: result,
    });
  } catch (err : any) {
    res.status(500).json({
      success: false,
      massage: err.message || 'Something Went Wrong',
      error: err,
    });
  }
};

export const studentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudents,
  deleteStudents
};
