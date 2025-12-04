// // import 'reflect-metadata';
// // import { NestFactory } from '@nestjs/core';
// // import { AppModule } from './app.module';
// // import * as dotenv from 'dotenv';

// // async function bootstrap() {
// //     dotenv.config();
// //     const app = await NestFactory.create(AppModule);
// //     const port = process.env.PORT || 15847;
// //     app.enableCors();
// //     await app.listen(port);
// //     console.log(`Server listening on http://localhost:${port}`);
// // }

// // bootstrap();

// import 'reflect-metadata';
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import * as dotenv from 'dotenv';

// async function bootstrap() {
//   dotenv.config();
//   const app = await NestFactory.create(AppModule);
//   const port = process.env.PORT || 15847;

//   // Configure CORS for your Vercel frontend
//   app.enableCors({
//     origin: "https://login-4ywc.vercel.app/", // replace with your actual Vercel domain
//     credentials: true,                   // allow cookies/authorization headers
//   });

//   await app.listen(port);
//   console.log(`Server listening on http://localhost:${port}`);
// }

// bootstrap();


import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 15847;

  // ✅ CORS config for localhost, local IP, and Vercel
  app.enableCors({
    origin: [
      "http://localhost:3000",
      "http://192.168.56.1:3000",
      "https://login-yp6n.vercel.app"
    ],
    credentials: true,
  });

  await app.listen(port);
  console.log(`Server listening on http://localhost:${port}`);
}

bootstrap();