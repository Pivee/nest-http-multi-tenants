import { Module } from '@nestjs/common';
import { ConnectionModule } from './connection/connection.module';
import { TenantsModule } from './tenants/tenants.module';

@Module({ imports: [TenantsModule, ConnectionModule] })
export class TenancyModule {}
