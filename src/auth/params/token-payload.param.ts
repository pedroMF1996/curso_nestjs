import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { REQUEST_TOKEN_PAYLOAD_KEY } from '../constants/auth.constants';
import { TokenPayloadDto } from '../dtos/token-payload.dto';

export const TokenPayloadParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): TokenPayloadDto => {
    const context = ctx.switchToHttp();
    const request = context.getRequest();
    return request[REQUEST_TOKEN_PAYLOAD_KEY];
  },
);
