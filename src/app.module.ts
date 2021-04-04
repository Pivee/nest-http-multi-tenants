import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './modules/common/common.module';
import { TenantsModule } from './modules/tenants/tenants.module';
import { TenancyMiddleware } from './tenancy/middleware/tenancy.middleware';
import { TenancyModule } from './tenancy/tenancy.module';
import { TenantsService } from './tenancy/tenants/tenants.service';

@Module({
  imports: [CommonModule, TenantsModule, TenancyModule],
  controllers: [AppController],
  providers: [AppService, TenantsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenancyMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
