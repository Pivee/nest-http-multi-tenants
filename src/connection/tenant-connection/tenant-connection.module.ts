import { FactoryProvider, Global, Module, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Product } from '../../modules/tenants/products/entities/product.entity';
import { createConnection, getConnectionManager } from 'typeorm';

const connectionFactory: FactoryProvider = {
  provide: 'TENANT_CONNECTION',
  scope: Scope.REQUEST,
  useFactory: async (request: Request) => {
    const tenantId = request.headers['x-tenant-id'];

    const connectionManager = getConnectionManager();

    if (tenantId) {
      const connectionName = `tenant_${tenantId}`;

      if (connectionManager.has(connectionName)) {
        const connection = connectionManager.get(connectionName);

        return Promise.resolve(
          connection.isConnected ? connection : connection.connect(),
        );
      }

      return createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5433,
        username: 'username',
        password: 'password',
        database: connectionName,
        name: connectionName,
        entities: [Product],
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
  exports: ['TENANT_CONNECTION'],
})
export class TenantConnectionModule {}
