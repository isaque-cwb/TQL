import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ProspectModule } from './modules/prospect/prospect.module';
import { CcModule } from './modules/cc/cc.module';
import { TimeSheetModule } from './modules/time-sheet/time-sheet.module';
import { SoliModule } from './modules/soli/soli.module';

@Module({
  imports: [UserModule, ProspectModule, CcModule, TimeSheetModule, SoliModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
