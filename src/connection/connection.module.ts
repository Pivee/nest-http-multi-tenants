import { Module } from '@nestjs/common';
import { CommonConnectionModule } from './common-connection/common-connection.module';
import { TenantConnectionModule } from './tenant-connection/tenant-connection.module';

@Module({
  imports: [CommonConnectionModule, TenantConnectionModule],
})
export class ConnectionModule {}
