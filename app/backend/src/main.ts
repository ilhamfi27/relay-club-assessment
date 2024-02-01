import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import c from './config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Sentiment Analysis API Documentation')
    .setDescription('Sentiment Analysis API documentation lies here')
    .setVersion('1.0.0')
    .setContact('Ilham Fadhilah', '', 'r.ilhamfadhilah@gmail.com')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(c().port);
}
bootstrap();
