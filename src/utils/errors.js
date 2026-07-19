import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import * as z from "zod";

export function getErrorMessage(err) {
    let error = {}

    if(err instanceof z.ZodError){
         const errors = z.flattenError(err).fieldErrors;      
         error = Object.values(errors).flat().at(0)
  
    } else if(err instanceof PrismaClientKnownRequestError){
        if(err.code === 'P2002') {
            error = 'Username already exist!'
        } else if(err.code === 'P2003'){
            error = 'Foreign key constraint failed!';
        } else {
            error = 'Database Error!'
        }
    } else {
        error = err.message;
    }

    return error
}