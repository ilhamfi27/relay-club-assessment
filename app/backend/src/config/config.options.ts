import { ConfigModuleOptions } from '@nestjs/config';
import configuration from './config';

export const configModuleOpts: ConfigModuleOptions = {
  load: [configuration],
  isGlobal: true,
  ignoreEnvFile: process.env.NODE_ENV === 'production',
};
