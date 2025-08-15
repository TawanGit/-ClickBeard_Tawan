// src/seeds/create-default-admin.seed.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../../../src/app.module';
import { ClientRepository } from '../repositories/clients/clientRepository';
import { ClientRole } from '../../../../src/modules/client/dtos/register-client-dto';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const clientRepository = app.get(ClientRepository);

  const defaultAdminName = 'admin';
  const defaultAdminEmail = 'admin@gmail.com';
  const defaultPassword: string =
    process.env.DEFAULT_PASSWORD_ADMIN || '123456';

  const existingAdmin = await clientRepository.findByEmail(defaultAdminEmail);
  if (existingAdmin.rows.length > 0) {
    console.log('⚠️ Admin Já existe');
    await app.close();
    return;
  }

  await clientRepository.createWithHash({
    name: defaultAdminName,
    email: defaultAdminEmail,
    password: defaultPassword,
    role: ClientRole.ADMIN,
  });

  console.log('✅ Admin padrão criado com sucesso!');
  await app.close();
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
