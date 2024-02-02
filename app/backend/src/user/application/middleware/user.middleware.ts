import { RequestContext } from '@/common/request-context';
import { UserService } from '@/user/domain/user.service';
import { UserEntity } from '@/user/model/entity/user.entity';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

interface RequestAddition {
  user?: UserEntity;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: UserService) {}
  async use(req: Request & RequestAddition, res: Response, next: NextFunction) {
    if (!req.headers['authorization']) {
      throw new UnauthorizedException(`Token Required`);
    }
    try {
      const authToken = req.header('authorization').split('Bearer ')[1];
      const user = await this.authService.verifyToken(authToken);
      RequestContext.setContext({
        user,
      });
      next();
    } catch (error) {
      throw new UnauthorizedException(`Invalid Token`);
    }
  }
}
