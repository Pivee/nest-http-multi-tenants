import { FactoryProvider, Global, Module, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { createConnection, getConnectionManager } from 'typeorm';
import { IRequestWithTenantConnection } from '../../interfaces/request-with-tenant-connection.interface';

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
        // TODO: Set the following properties in the Tenants Table
        name: request.tenantConnection.name,
        host: request.tenantConnection.host,
        port: request.tenantConnection.port,
        username: request.tenantConnection.username,
        password: request.tenantConnection.password,
        database: request.tenantConnection.database,
        entities: ['dist/modules/tenants/**/*.entity{.ts,.js}'],
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
