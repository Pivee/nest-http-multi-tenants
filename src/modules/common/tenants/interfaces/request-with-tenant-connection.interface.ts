import { Request } from 'express';

export interface IRequestWithTenantConnection extends Request {
  tenantConnection: ITenantConnection;
}

interface ITenantConnection {
  name: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}
