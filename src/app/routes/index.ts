import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { studentRoutes } from "../modules/student/student.route";


const router = Router();

const moduleRoute = [
    {
    path:'/users',
    route:UserRoutes
    },
    {
    path:'/students',
    route: studentRoutes
    }
];

moduleRoute.forEach((route)=> router.use(route.path, route.route));

export default router;