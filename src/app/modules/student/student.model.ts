import { Schema, model, connect } from 'mongoose';
import validator from 'validator';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  
  StudentModel,
  TUserName,
} from './../student/student.interface';


const studentNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'FirstName is required'],
    // no space automatic space generator
    trim: true,
    maxlength: [20, '{VALUE} is longer then maximum allowed length 20'],
    // custom validate "{Mezba}
    validate: {
      validator: function (value: string) {
        const firstNameStr =
          value.charAt(0).toLocaleUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not in capitalize formate',
    },
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} IS NOT VALIED',
    },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Fathers Name is required'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father Occupation is required'],
  },
  fatherContact: {
    type: String,
    required: [true, 'Father Contact is required'],
  },
  motherName: {
    type: String,
    required: [true, 'Mother Name is required'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother Occupation is required'],
  },
  motherContact: {
    type: String,
    required: [true, 'Mother Occupation is required'],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: [true, 'local guardian name is required'] },
  occupation: {
    type: String,
    required: [true, 'local guardian occupation is required'],
  },
  address: { type: String, required: [true, 'address is required'] },
  contactNo: { type: String, required: [true, 'contact number is required'] },
});

// 2. Create a Schema corresponding to the document interface.
const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: [true, 'id is required'], unique: true },
  user:{
     type: Schema.Types.ObjectId,
     required: [true, 'user id is required'],
     unique:true,
     ref:"User"
  },
  name: {
    type: studentNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: 'The Gender Field Is Required',
    },
    required: [true, 'Gender is required'],
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} IS NOT VALID',
    },
  },
  contactNo: {
    type: String,
    required: [true, 'ContactNo is required'],
  },
  emergencyContactNo: {
    type: String,
    required: [true, ' Emergency Contact No is required'],
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
  },
  presentAddress: {
    type: String,
    required: [true, 'Present Address is required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Parmanent Address is required'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian is required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'local guardian is required'],
  },
  profileImg: {
    type: String,
  },
 
  isDeleted:{
    type:Boolean,
    default:false
  }
  },
{
  toJSON:{
    virtuals:true
  }
}
);


 studentSchema.statics.isUserExists = async function (id:string) {
       const existingUser = await Student.findOne({id})
      return existingUser;
  }

// virtual
  studentSchema.virtual('fullName').get(function(){
    return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
  })



// query middleware 

studentSchema.pre('findOne', function(next){
  // console.log(this);
  this.find({isDeleted : {$ne:true }})
  next();

});
studentSchema.pre('find', function(next){
  // console.log(this);
  this.find({isDeleted : {$ne:true }})
  next();

});


studentSchema.pre('aggregate', function(next){
  this.pipeline().unshift({ $match:{ isDeleted:true } }); 

  next();

});





 // create instance with custom method
 
  //  studentSchema.methods.isUserExists = async function (id:string) {
  //    const existingUser = await Student.findOne({id})
  //    return existingUser;
  //  }






// 3. Create a Model.

export const Student = model<TStudent,StudentModel>('Student', studentSchema);
