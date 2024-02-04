import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';

export const getAppModule = async () => {
  const restAppModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  return restAppModule;
};

export const closeModule = async () => {
  const module = await getAppModule();
  await module.close();
};
