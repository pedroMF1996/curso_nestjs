import { Global, Module } from '@nestjs/common';
import { HashingServiceProtocol } from './hashing/ashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pessoa } from 'src/pessoas/entities/pessoa.entity';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './configs/jwt.config';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Pessoa]),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AuthController],
  providers: [
    JwtService,
    { provide: HashingServiceProtocol, useClass: BcryptService },
    AuthService,
  ],
  exports: [
    { provide: HashingServiceProtocol, useClass: BcryptService },
    JwtModule,
    ConfigModule,
  ],
})
export class AuthModule {}
