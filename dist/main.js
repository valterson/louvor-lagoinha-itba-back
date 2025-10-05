"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./modules/auth/auth.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    // Enable CORS
    app.enableCors({
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    });
    // Configure Swagger
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Louvor Lagoinha API')
        .setDescription('API para gerenciamento de cultos')
        .setVersion('1.0')
        .addTag('musicas')
        .addTag('pessoas')
        .addTag('cultos')
        .addTag('auth')
        .addBearerAuth() // Adiciona suporte ao Bearer token no Swagger
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    // Create default user
    const authService = app.get(auth_service_1.AuthService);
    await authService.createDefaultUser();
    const port = process.env.PORT ?? 3000;
    await app.listen(port, '0.0.0.0'); // Importante o '0.0.0.0' no Render
    console.log(`🚀 Application is running on port ${port}`);
}
bootstrap();
