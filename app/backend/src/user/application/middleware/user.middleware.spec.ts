import { UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthMiddleware, RequestAddition } from './user.middleware';
import { UserService } from '@/user/domain/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserQuery } from '@/user/infrastructure/db/user.query';
import { SupabaseProvider } from '@/supabase/supabase.provider';
import { ConfigService } from '@nestjs/config';

jest.mock('@/user/domain/user.service');
jest.mock('@nestjs/jwt');
jest.mock('@/user/infrastructure/db/user.query');
jest.mock('@/supabase/supabase.provider');
jest.mock('@nestjs/config');

const mockVerifyToken = jest.fn();

UserService.prototype.verifyToken = mockVerifyToken;

describe('src/user/application/middleware/user.middleware.test.ts', () => {
  let middleware: AuthMiddleware;
  let req: Request & RequestAddition;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    middleware = new AuthMiddleware(
      new UserService(
        new JwtService(),
        new UserQuery(new SupabaseProvider(new ConfigService())),
      ),
    );
    req = {
      headers: {},
    } as Request & RequestAddition;
    res = {} as Response;
    next = jest.fn();
  });

  describe('use', () => {
    it('should throw UnauthorizedException if authorization header is missing', async () => {
      // Act & Assert
      await expect(middleware.use(req, res, next)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(next).not.toHaveBeenCalled();
    });

    it('should throw UnauthorizedException if token is invalid', async () => {
      // Arrange
      req.headers['authorization'] = 'Bearer invalid-token';

      // Mock the verifyToken method to throw an error
      mockVerifyToken.mockRejectedValue(new Error('Invalid token'));

      // Act & Assert
      await expect(middleware.use(req, res, next)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(next).not.toHaveBeenCalled();
    });

    it('should set the user in the RequestContext and call next if token is valid', async () => {
      // Arrange
      req.headers['authorization'] = 'Bearer valid-token';

      // Mock the verifyToken method to return a user object
      const user = { id: 1, name: 'John Doe' };
      mockVerifyToken.mockResolvedValue(user);

      // Act
      await middleware.use(req, res, next);

      // Assert
      expect(next).toHaveBeenCalled();
    });
  });
});
