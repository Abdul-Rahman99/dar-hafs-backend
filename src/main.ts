import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SharedModule } from './shared/shared.module';
import { ApiConfigService } from './shared/services/api-config.service';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.select(SharedModule).get(ApiConfigService);
  const port = configService.appConfig.port;
  console.log('Application has started');

  app.setGlobalPrefix(
    configService.appConfig.apiPrefix + configService.appConfig.apiVersion,
    {
      exclude: ['/'],
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = errors.map((error: any) => ({
          property: error.property,
          constraints: error.constraints[Object.keys(error.constraints)[0]],
        }));
        return new BadRequestException({
          error: {
            formatValidationError: result,
          },
        });
      },
      stopAtFirstError: true,
    }),
  );

  await app.listen(port);
}
bootstrap();
