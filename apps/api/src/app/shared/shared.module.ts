import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
// services
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { LoggingInterceptor } from './interceptors/loggng.interceptor';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class SharedModule {}
