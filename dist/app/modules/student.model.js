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
exports.Student = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../config"));
const studentNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'FirstName is required'],
        // no space automatic space generator
        trim: true,
        maxlength: [20, '{VALUE} is longer then maximum allowed length 20'],
        // custom validate "{Mezba}
        validate: {
            validator: function (value) {
                const firstNameStr = value.charAt(0).toLocaleUpperCase() + value.slice(1);
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
            validator: (value) => validator_1.default.isAlpha(value),
            message: '{VALUE} IS NOT VALIED',
        },
    },
});
const guardianSchema = new mongoose_1.Schema({
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
const localGuardianSchema = new mongoose_1.Schema({
    name: { type: String, required: [true, 'local guardian name is required'] },
    occupation: {
        type: String,
        required: [true, 'local guardian occupation is required'],
    },
    address: { type: String, required: [true, 'address is required'] },
    contactNo: { type: String, required: [true, 'contact number is required'] },
});
// 2. Create a Schema corresponding to the document interface.
const studentSchema = new mongoose_1.Schema({
    id: { type: String, required: [true, 'id is required'], unique: true },
    password: { type: String, required: [true, 'password is required'], maxlength: [20, 'password cannot be more then 20 character'] },
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
            validator: (value) => validator_1.default.isEmail(value),
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
    isActive: {
        type: String,
        enum: ['active', 'blocked'],
        default: 'active',
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    toJSON: {
        virtuals: true
    }
});
studentSchema.statics.isUserExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.Student.findOne({ id });
        return existingUser;
    });
};
// virtual
studentSchema.virtual('fullName').get(function () {
    return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});
// pre save middleware / hook
studentSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
        // console.log(this, 'pre hook : we will save the data');
        next();
    });
});
studentSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});
// query middleware 
studentSchema.pre('findOne', function (next) {
    // console.log(this);
    this.find({ isDeleted: { $ne: true } });
    next();
});
studentSchema.pre('find', function (next) {
    // console.log(this);
    this.find({ isDeleted: { $ne: true } });
    next();
});
studentSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: true } });
    next();
});
// create instance with custom method
//  studentSchema.methods.isUserExists = async function (id:string) {
//    const existingUser = await Student.findOne({id})
//    return existingUser;
//  }
// 3. Create a Model.
exports.Student = (0, mongoose_1.model)('Student', studentSchema);
