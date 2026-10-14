import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ============================================================
  // CORS — Allow local dev + Netlify production + Railway preview
  // ============================================================
  const allowedOrigins = [
    'http://localhost:3000',           // Next.js local dev
    'http://localhost:3001',           // Backend local (for testing)
    process.env.FRONTEND_URL,          // Netlify production URL (from env)
    // Add additional allowed origins below
  ].filter(Boolean) as string[];       // Remove undefined entries

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, curl)
      if (!origin) return callback(null, true);

      // Allow if origin is in the whitelist
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Allow any Netlify preview deploy (*.netlify.app)
      if (origin.endsWith('.netlify.app')) {
        return callback(null, true);
      }

      // Allow any Railway preview deploy (*.up.railway.app)
      if (origin.endsWith('.up.railway.app')) {
        return callback(null, true);
      }

      // Otherwise block
      return callback(new Error(`CORS blocked: ${origin}`), false);
    },
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  // ============================================================
  // GLOBAL PIPES
  // ============================================================
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // ============================================================
  // GLOBAL PREFIX
  // ============================================================
  app.setGlobalPrefix('api');

  // ============================================================
  // START SERVER
  // ============================================================
  const port = process.env.PORT || 3001;
  await app.listen(port, '0.0.0.0'); // '0.0.0.0' is required for Railway
  console.log(`🚀 InvoiceFlow API running on port ${port}/api`);
}
bootstrap();