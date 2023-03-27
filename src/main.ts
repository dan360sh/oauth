import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  // const key = new NodeRSA({b: 512});
  // key.generateKeyPair(1024 );
 // key.exportKey([format]);
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
