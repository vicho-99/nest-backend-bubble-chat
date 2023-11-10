import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus,
    InternalServerErrorException,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { QueryFailedError, TypeORMError } from 'typeorm';

type ExceptionResponse = {
    statusCode: number;
    message: string;
};

@Catch(TypeORMError, QueryFailedError)

export class TypeORMExceptionFilter implements ExceptionFilter {

    private defaultExceptionResponse: ExceptionResponse = new InternalServerErrorException().getResponse() as ExceptionResponse;

    private exceptionResponse: ExceptionResponse = this.defaultExceptionResponse;

    catch(exception: TypeORMError | QueryFailedError, host: ArgumentsHost) {

        exception instanceof QueryFailedError && this.setQueryFailedErrorResponse(exception);

        const res = host.switchToHttp().getResponse<FastifyReply>();

        res.status(this.exceptionResponse.statusCode).send(this.exceptionResponse);
    }

    private setQueryFailedErrorResponse(exception: QueryFailedError): void {

        const error = exception.driverError;

        if (error.code === "22P02") {

            const message = "Entity relationship identifier not found - " + error.toString()

            this.exceptionResponse = {
                statusCode: HttpStatus.BAD_REQUEST,
                message
            };

        }

        if (error.code === '23505') {

            const message = error.detail

            this.exceptionResponse = {
                statusCode: HttpStatus.BAD_REQUEST,
                message,
            };
        }


    }

}