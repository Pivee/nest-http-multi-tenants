import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './modules/common/common.module';
import { TenantSpecificModule } from './modules/tenant-specific/tenant-specific.module';
import { TenancyModule } from './tenancy/tenancy.module';
import { TenantsService } from './tenancy/tenants/tenants.service';

@Module({
  imports: [TenancyModule, CommonModule, TenantSpecificModule],
  controllers: [AppController],
  providers: [AppService, TenantsService],
})
export class AppModule {}
