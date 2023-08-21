import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { hostname } from 'os'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(3000, '0.0.0.0', () => {
    console.log('server is running!!!!')
  })
}
bootstrap()
