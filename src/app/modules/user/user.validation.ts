import { z } from "zod";

// User validation Schema
const userValidationSchema = z.object({
    
    password:z.string(
        {
            invalid_type_error:'Password Must Be String',
            
        }
    ).max(20,{message:"Password Can Not Be More Then 20 Character!!!"}).optional(),
   
});

export const UserValidation ={
    userValidationSchema
}