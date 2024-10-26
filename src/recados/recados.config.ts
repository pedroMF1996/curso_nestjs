import { registerAs } from '@nestjs/config';

export default registerAs('recadosConfig', () => ({
  teste1: 'valor1',
  teste2: 'valor2',
}));
