import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'
import { ResponseInterceptor } from './DefaultMessages/ResponseDefault';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as redis from 'redis';
import * as dotenv from 'dotenv';


dotenv.config();


export const client_redis: any = redis.createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT)
  }
});



async function bootstrap() {
  await client_redis.connect()

  const app = await NestFactory.create(AppModule, { cors: false });
  app.useGlobalPipes(
    new ValidationPipe({}),
  );
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.enableCors();


  const config = new DocumentBuilder()
    .setTitle('Catálogo de Filmes')
    .setDescription('Uma API para catalogar filmes')
    .setVersion('1.0')
    .addTag('movie')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT).then(() => console.log(`Ouvindo na porta ${process.env.PORT}`))
}
bootstrap();

