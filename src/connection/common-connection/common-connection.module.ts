import { FactoryProvider, Global, Module, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { createConnection, getConnectionManager } from 'typeorm';
import { Tenant } from '../../modules/common/tenants/entities/tenant.entity';
import { User } from '../../modules/common/users/entities/user.entity';

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
      host: 'localhost',
      port: 5432,
      username: 'username',
      password: 'password',
      database: 'tenants__all',
      entities: [Tenant, User],
      logging: false,
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
