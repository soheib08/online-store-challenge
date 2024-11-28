import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserIdExample } from './currentUser';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    return UserIdExample;
  },
);
