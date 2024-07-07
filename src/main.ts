import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/envs';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3002'
  });
  // app.enableCors(options);
  app.setGlobalPrefix('/api');

  await app.listen(envs.PORT);

  Logger.log(`Aplication Running on PORT => ${envs.PORT}`);
}
bootstrap();
