import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthService } from './modules/auth/auth.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  const allowedOrigins = [
    'http://localhost:5173', // Vite dev server
    'http://localhost:3000', // Possível outra porta local
    'http://127.0.0.1:5173', // Localhost alternativo
    'http://127.0.0.1:3000', // Localhost alternativo
  ];

  // Adiciona a URL do frontend de produção se estiver definida
  if (process.env.FRONTEND_URL && !allowedOrigins.includes(process.env.FRONTEND_URL)) {
    allowedOrigins.push(process.env.FRONTEND_URL);
  }

  app.enableCors({
    origin: (origin, callback) => {
      // Permite requisições sem origin (ex: Postman, aplicações mobile)
      if (!origin) return callback(null, true);
      
      // Verifica se a origin está na lista permitida
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      
      // Em desenvolvimento, permite qualquer localhost
      if (process.env.NODE_ENV !== 'production' && origin.includes('localhost')) {
        return callback(null, true);
      }
      
      return callback(new Error('Não permitido pelo CORS'), false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type', 
      'Authorization', 
      'Accept', 
      'Origin', 
      'X-Requested-With',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Methods'
    ],
    exposedHeaders: ['Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  // Configure Swagger
  const config = new DocumentBuilder()
    .setTitle('Louvor Lagoinha API')
    .setDescription('API para gerenciamento de cultos')
    .setVersion('1.0')
    .addTag('musicas')
    .addTag('pessoas')
    .addTag('cultos')
    .addTag('auth')
    .addBearerAuth() // Adiciona suporte ao Bearer token no Swagger
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Create default user
  const authService = app.get(AuthService);
  await authService.createDefaultUser();

  const port = process.env.PORT ?? 3000;
  await app.listen(port, '0.0.0.0'); // Importante o '0.0.0.0' no Render

  console.log(`🚀 Application is running on port ${port}`);
}
bootstrap();
