import  {  Request, Response,NextFunction } from 'express';
import httpStatus from 'http-status';

 const NotFound = (req:Request,res:Response, next:NextFunction )=>{
 
 
    return res.status(httpStatus.NOT_FOUND).json({
     success: false,
     message: "API NotFound!!"
   
    })  
 };

 export default NotFound;