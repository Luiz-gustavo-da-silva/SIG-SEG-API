// message, status codes, error

export class HttpException extends Error{
    message: string;
    errorCode: any;
    statusCode: number;
    errors: ErrorCode;

    constructor (message:string, errorCode: ErrorCode, statusCode:number, error: any){
        super(message)
        this.message = message
        this.errorCode = errorCode
        this.statusCode = statusCode
        this.errors = error
    }
}

export enum ErrorCode{
    USER_NOT_FOUND = 1001,
    USER_ALREADY_EXISTS = 1002,
    INCORRECT_PASSWORD = 1003,
    UNPROCESSABLE_ENTITY = 20001,
    INTERNAL_EXCEPTION = 3001,
    UNAUTHORIZED = 401,
    REPORT_NOT_FOUND = 404,
    REPORT_IN_OCCURRENCE = 405,
    OCCURRENCE_NOT_FOUND = 406
}