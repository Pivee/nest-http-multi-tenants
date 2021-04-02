import { FactoryProvider, Global, Module, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { createConnection, getConnectionManager } from 'typeorm';
import { ormconfig } from './ormconfig';

const connectionFactory: FactoryProvider = {
  provide: 'CONNECTION',
  scope: Scope.REQUEST,
  useFactory: async (request: Request) => {
    const tenantId = request.headers['x-tenant-id'];

    if (tenantId) {
      const connectionName = `tenant_${tenantId}`;

      const connectionManager = getConnectionManager();

      if (connectionManager.has(connectionName)) {
        const connection = connectionManager.get(connectionName);

        return Promise.resolve(
          connection.isConnected ? connection : connection.connect(),
        );
      }

      return createConnection({
        ...ormconfig,
        database: connectionName,
        name: connectionName,
        entities: [],
        logging: true,
        synchronize: true,
      } as any);
    } else {
      return createConnection({
        ...ormconfig,
        database: 'multitenants',
        entities: [],
        logging: true,
        synchronize: true,
      } as any);
    }
  },
  inject: [REQUEST],
};

@Global()
@Module({
  providers: [connectionFactory],
  exports: ['CONNECTION'],
})
export class ConnectionModule {}
