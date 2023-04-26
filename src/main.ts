import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "./auth/pipes/validation.oipe";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
      .setTitle('Сервис авторизаци')
      .setDescription('Документация REST API')
      .setVersion('1.0.0')
      .addBearerAuth()
      .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
