import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { UUIDGenerator } from './app/services/uuid-generator';

(() => {
  console.log(UUIDGenerator.create());
})();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
