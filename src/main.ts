import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<INestApplication>(AppModule);

  await app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true, // throw error when whitelist property is found
      whitelist: true, // detect property outside dto
      transform: true, // instance of Dto
    }),
  );

  //const configurationService = app.get(ConfigService);

  const options = new DocumentBuilder()
    .setTitle('API Music')
    .setDescription('An API to retrieve music informations')
    .setVersion('1.0')
    .addTag('API Music')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.setGlobalPrefix('1.0');

  await app
    .listen(3000)
    .then(() =>
      console.log(
        `HTTP Server is listening on port 3000...`,
        'Bootstrap',
      ),
    );
}
bootstrap();
