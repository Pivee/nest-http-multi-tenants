import { Request } from 'express';

export interface IRequestWithTenantConnection extends Request {
  tenantConnection: ITenantConnection;
}

export interface ITenantConnection {
  id?: string;
  code?: string;
  name: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}
