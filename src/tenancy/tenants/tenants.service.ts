import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Tenant } from './entities/tenant.entity';

@Injectable()
export class TenantsService {
  private readonly tenantsRepository: Repository<Tenant>;
  constructor(
    @Inject('COMMON_CONNECTION')
    connection,
  ) {
    this.tenantsRepository = connection.getRepository(Tenant);
  }

  async findOneByTenantCode(code) {
    return await this.tenantsRepository.findOne({
      code: code,
    });
  }
}
