import { FactoryProvider, Global, Module, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { createConnection, getConnectionManager } from 'typeorm';
import { Tenant } from '../../tenants/entities/tenant.entity';

const connectionFactory: FactoryProvider = {
  provide: 'COMMON_CONNECTION',
  scope: Scope.REQUEST,
  useFactory: async () => {
    const connectionManager = getConnectionManager();

    if (connectionManager.has('default')) {
      const connection = connectionManager.get('default');

      return Promise.resolve(
        connection.isConnected ? connection : connection.connect(),
      );
    }

    return createConnection({
      type: 'postgres',
      // TODO: Configure the following properties accordingly
      host: 'localhost',
      port: 5432,
      username: 'username',
      password: 'password',
      database: 'common',
      // NOTE: No need to import Tenant if there's a Tenant Microservice
      entities: [Tenant, 'dist/modules/common/**/*.entity{.ts,.js}'],
      migrations: ['dist/tenancy/migrations/common/*{.ts,.js}'],
      migrationsRun: true,
      logging: true,
      synchronize: false,
      dropSchema: false,
    } as any);
  },
  inject: [REQUEST],
};

@Global()
@Module({
  providers: [connectionFactory],
  exports: ['COMMON_CONNECTION'],
})
export class CommonConnectionModule {}
