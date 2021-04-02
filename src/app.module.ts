import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConnectionModule } from './connection/connection.module';
import { PublicModule } from './modules/public/public.module';
import { TenantsModule } from './modules/tenants/tenants.module';

@Module({
  imports: [ConnectionModule, PublicModule, TenantsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
