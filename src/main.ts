import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(3333, '0.0.0.0', () => {
    console.log('server is running!!!!')
  })
}
bootstrap()
