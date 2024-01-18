import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
  };
  app.enableCors(corsOptions);
  await app.listen(5000);
}
bootstrap();
