import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserId } from './currentUser';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    return UserId;
  },
);
