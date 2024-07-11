"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const student_route_1 = require("./app/modules/student/student.route");
const app = (0, express_1.default)();
const port = 3000;
// parser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// application routes
app.use('/api/v1/students', student_route_1.studentRoutes);
app.get('/', (req, res) => {
    const a = 10;
    res.send(a);
});
console.log(process.cwd());
//C:\Level 2.0\MIlestone-2\project-setup.env
exports.default = app;
