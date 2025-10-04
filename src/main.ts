import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthService } from './modules/auth/auth.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
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
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Create default user
  const authService = app.get(AuthService);
  await authService.createDefaultUser();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
