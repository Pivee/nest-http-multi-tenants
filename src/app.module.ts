import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConnectionModule } from './connection/connection.module';
import { PublicModule } from './modules/public/public.module';

@Module({
  imports: [ConnectionModule, PublicModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
