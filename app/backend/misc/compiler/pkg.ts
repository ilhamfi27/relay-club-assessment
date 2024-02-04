import { exec } from 'pkg';

const target = [
  process.env.PKG_NODE_VERSION || 'node18',
  process.env.PKG_PLATFORM || 'alpine',
].join('-');

exec(['.', '--target', target]);
