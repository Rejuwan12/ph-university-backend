
import { Student } from './../student/student.model';



const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const deleteStudentsFromDB = async (id:string) => {
  const result = await Student.updateOne({id},{isDeleted:true});
  return result;
};
const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([
    {$match:{id:id}}
  ])
  return result;
};

export const studentServices = {
  
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentsFromDB
};
