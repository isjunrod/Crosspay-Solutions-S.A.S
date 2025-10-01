import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  // Habilitar validación automática con class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remover propiedades no definidas
      forbidNonWhitelisted: true, // Lanzar error si hay propiedades extra
      transform: true, // Transformar tipos automáticamente
    })
  );

  // Prefijo global para API
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3001;
  await app.listen(port);

  console.log(`🚀 CrossPay Backend running on port ${port}`);
  console.log(`📍 API: http://localhost:${port}/api`);
}

bootstrap();
