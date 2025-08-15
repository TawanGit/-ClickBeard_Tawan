// database.service.ts
import { Injectable } from '@nestjs/common';
import { Pool, QueryResult } from 'pg';
import { databaseConfig } from '../../config/database.config';

@Injectable()
export class DatabaseService {
  private pool: Pool;

  constructor() {
    this.pool = new Pool(databaseConfig);
  }

  query<T = any>(text: string, params?: any[]): Promise<QueryResult<T>> {
    return this.pool.query<T>(text, params);
  }
}
