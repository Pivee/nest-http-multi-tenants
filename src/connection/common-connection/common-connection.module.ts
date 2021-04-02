import { FactoryProvider, Global, Module, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { createConnection, getConnectionManager } from 'typeorm';
import { User } from '../../modules/public/users/entities/user.entity';

const connectionFactory: FactoryProvider = {
  provide: 'COMMON_CONNECTION',
  scope: Scope.REQUEST,
  useFactory: async (request: Request) => {
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
      entities: [User],
      logging: true,
      synchronize: true,
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
