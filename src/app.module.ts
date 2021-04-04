import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConnectionModule } from './connection/connection.module';
import { ConnectionPropsMiddleware } from './middlewares/connection-props.middleware';
import { CommonModule } from './modules/common/common.module';
import { TenantsModule } from './modules/tenants/tenants.module';

@Module({
  imports: [ConnectionModule, CommonModule, TenantsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ConnectionPropsMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
