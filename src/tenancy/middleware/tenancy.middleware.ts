import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { IRequestWithTenantConnection } from '../interfaces/request-with-tenant-connection.interface';
import { TenantsService } from '../tenants/tenants.service';

@Injectable()
export class TenancyMiddleware implements NestMiddleware {
  constructor(
    // NOTE: TenantsService must be provided into AppModule as a provider
    @Inject(TenantsService) private readonly tenantsService: TenantsService,
  ) {}

  async use(request: any, response: any, next: () => void) {
    const tenant = await this.tenantsService.findOneByTenantCode(
      request.headers['x-tenant-code'],
    );

    (request as IRequestWithTenantConnection).tenantConnection = {
      name: tenant.code,
      host: tenant.host,
      port: tenant.port,
      username: tenant.username,
      password: tenant.password,
      database: tenant.database,
    };

    next();
  }
}
