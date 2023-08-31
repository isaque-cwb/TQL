import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ProspectModule } from './modules/prospect/prospect.module';
import { CcModule } from './modules/cc/cc.module';

@Module({
  imports: [UserModule, ProspectModule, CcModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
