import { FactoryProvider, Global, Module, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { TenantsModule } from 'src/tenancy/tenants/tenants.module';
import { TenantsService } from 'src/tenancy/tenants/tenants.service';
import { createConnection, getConnectionManager } from 'typeorm';

const connectionFactory: FactoryProvider = {
  provide: 'TENANT_CONNECTION',
  scope: Scope.REQUEST,
  useFactory: async (request: any, tenantsService: TenantsService) => {
    const tenantCode =
      request.headers?.['x-tenant-code'] || request.data?.tenantCode;

    const connectionManager = getConnectionManager();

    if (tenantCode) {
      const connectionName = tenantCode;

      if (connectionManager.has(connectionName)) {
        const connection = connectionManager.get(connectionName);

        return Promise.resolve(
          connection.isConnected ? connection : connection.connect(),
        );
      }

      const tenant = await tenantsService.findOneByTenantCode(tenantCode);

      return createConnection({
        type: 'postgres',
        // TODO: Set the following properties in the Tenants Table
        name: tenant.code,
        host: tenant.host,
        port: tenant.port,
        username: tenant.username,
        password: tenant.password,
        database: tenant.database,
        entities: ['dist/modules/tenant-specific/**/*.entity{.ts,.js}'],
        migrations: ['dist/tenancy/migrations/tenant-specific/*{.ts,.js}'],
        migrationsRun: true,
        logging: false,
        synchronize: false,
        dropSchema: false,
      } as any);
    }
  },
  inject: [REQUEST, TenantsService],
};

@Global()
@Module({
  imports: [TenantsModule],
  providers: [connectionFactory, TenantsService],
  exports: ['TENANT_CONNECTION'],
})
export class TenantConnectionModule {}
