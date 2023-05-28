import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalLoginGuard extends AuthGuard('local') implements CanActivate {
  public override async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    // let request: any;
    const result = <boolean>await super.canActivate(context);
    // request = context.switchToHttp().getRequest<Request>();
    // await super.logIn(request);

    return result;
  }
}
