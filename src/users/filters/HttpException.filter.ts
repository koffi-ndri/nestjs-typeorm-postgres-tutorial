/* eslint-disable prettier/prettier */

import { ArgumentsHost, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";

export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const request = context.getRequest<Request>();
        const response = context.getResponse<Response>();

        // response.sendStatus(exception.getStatus())
        response.send({
            status: exception.getStatus(),
            message: exception.getResponse()
        })
    }
}