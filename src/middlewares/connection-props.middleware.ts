import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Tenant } from '../modules/common/tenants/entities/tenant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConnectionPropsMiddleware implements NestMiddleware {
  private readonly tenantsRepository: Repository<Tenant>;
  constructor(
    @Inject('COMMON_CONNECTION')
    connection,
  ) {
    this.tenantsRepository = connection.getRepository(Tenant);
  }

  async use(request: any, response: any, next: () => void) {
    const tenant = await this.tenantsRepository.findOne({
      code: request.headers['x-tenant-id'],
    });

    request.connectionProps = {
      port: tenant.port,
    };

    next();
  }
}
