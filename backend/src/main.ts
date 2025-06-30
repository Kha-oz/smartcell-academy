import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Servir archivos estáticos
  const staticPath = join(__dirname, '..', "..", 'public');
  // console.log('Sirviendo archivos estáticos desde:', staticPath);
  app.useStaticAssets(staticPath);

  // Habilitar CORS para el frontend de forma dinámica , despues hacerlo 
  app.enableCors({
    origin: 'https://smartcell-academy.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
  console.log(`Backend running on port ${port}`);
}
bootstrap();
