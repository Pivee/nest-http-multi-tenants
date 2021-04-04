import { Module } from '@nestjs/common';
import { TenantsService } from './tenants.service';

@Module({ providers: [TenantsService] })
export class TenantsModule {}
