import { FactoryProvider, Global, Module, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { IRequestWithTenantConnection } from 'src/modules/common/tenants/interfaces/request-with-tenant-connection.interface';
import { createConnection, getConnectionManager } from 'typeorm';
import { Product } from '../../modules/tenants/products/entities/product.entity';

const connectionFactory: FactoryProvider = {
  provide: 'TENANT_CONNECTION',
  scope: Scope.REQUEST,
  useFactory: async (request: IRequestWithTenantConnection) => {
    const tenantCode = request.headers['x-tenant-code'];

    const connectionManager = getConnectionManager();

    if (tenantCode) {
      const connectionName = request.tenantConnection.name;

      if (connectionManager.has(connectionName)) {
        const connection = connectionManager.get(connectionName);

        return Promise.resolve(
          connection.isConnected ? connection : connection.connect(),
        );
      }

      return createConnection({
        type: 'postgres',
        name: request.tenantConnection.name,
        host: request.tenantConnection.host,
        port: request.tenantConnection.port,
        username: request.tenantConnection.username,
        password: request.tenantConnection.password,
        database: request.tenantConnection.database,
        entities: [Product],
        logging: false,
        synchronize: false,
        dropSchema: false,
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
