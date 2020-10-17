import {ErrorRequestHandler} from 'express';
import {ValidationError} from 'yup'

interface ValidationErrors{
    [Key: string]: string[];
}

const handlerError: ErrorRequestHandler  = (error, request, response, next) => {
    if(error instanceof ValidationError){
        let errors: ValidationErrors = {}; 

        error.inner.forEach(err => {
            errors[err.path] = err.errors;
        })

        return response.status(400).json({message: "Validation fails", errors});
    }

    console.log(error);

    return response.status(500).json({message: "INTERNAL SERVER ERROR"});
};

export default handlerError;