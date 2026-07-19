import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import * as z from "zod";

export function getErrorMessage(err) {
    let error = {}

    if(err instanceof z.ZodError){
         const errors = z.flattenError(err).fieldErrors;
         console.log('from errors before',errors);
         
         error = Object.values(errors).flat().at(0)
         console.log('from errors after', error);

    } else if(err instanceof PrismaClientKnownRequestError){
        if(err.code === 'P2002') {
            error = 'Username already exist!'
        } else if(err.code === 'P2003'){
            error = 'Foreign key constraint failed!';
        } else {
            error = 'Database Error!'
        }
    } else {
        error = error.message;
    }

    return error
}