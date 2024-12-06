import { HttpException, HttpStatus } from '@nestjs/common';

export class ResponseHandler {
  static successObject<T>(
    data: T,
    message: string,
  ): { data: T; message: string } {
    return {
      data,
      message,
    };
  }

  static successArray<T>(
    data: T[],
    message: string,
  ): { data: { data: T[] }; message: string } {
    return {
      data: { data },
      message,
    };
  }

  static created<T>(data: T): { data: T } {
    return {
      data: { ...data },
    };
  }

  static errorBadRequest(message: string): never {
    throw new HttpException(
      {
        error: message,
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  static errorUnprocessableEntity<T>(
    message: string,
    error: T | null = null,
  ): never {
    throw new HttpException(
      {
        error: {
          businessValidation: [{ property: error?.['property'], message }],
        },
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
