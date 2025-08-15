import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { ClientRepository } from '../database/repositories/clients/clientRepository';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [ClientController],
  providers: [ClientService, ClientRepository, DatabaseService],
})
export class ClientModule {}
