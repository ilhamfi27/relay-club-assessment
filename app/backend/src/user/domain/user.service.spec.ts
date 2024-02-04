import { TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getAppModule } from 'test/fixture/module-fixture';
import { UserQuery } from '../infrastructure/db/user.query';
import {
  UserLoginDto,
  UserRegisterDto,
} from '../application/rest/user.request';
import { hashString } from '@/common/hash';
import { UserEntity, UserRole } from '../model/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { RequestContext } from '@/common/request-context';
import { UnauthorizedException } from '@nestjs/common';

describe('src/user/domain/user.service.spec.ts', () => {
  let service: UserService;
  let userQuery: UserQuery;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await getAppModule();

    service = module.get<UserService>(UserService);
    userQuery = module.get<UserQuery>(UserQuery);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('login', () => {
    it('should login user successfully', async () => {
      // Arrange
      const user: UserLoginDto = {
        username: 'testuser',
        password: 'testpassword',
      };

      const userDb: UserEntity = {
        id: 1,
        username: 'testuser',
        password: hashString('testpassword'),
        name: 'Test User',
        role: UserRole.BUYER,
      };

      jest.spyOn(userQuery, 'findUserByUsername').mockResolvedValueOnce(userDb);
      jest.spyOn(jwtService, 'sign').mockReturnValueOnce('mockedToken');

      // Act
      const result = await service.login(user);

      // Assert
      expect(userQuery.findUserByUsername).toHaveBeenCalledWith(
        user.username,
        true,
      );
      expect(jwtService.sign).toHaveBeenCalledWith(
        { username: user.username, sub: user.username },
        { expiresIn: '1y', secret: 'supersecretdata' },
      );
      expect(result).toEqual({
        idToken: 'mockedToken',
        user: {
          id: 1,
          username: 'testuser',
          name: 'Test User',
          role: UserRole.BUYER,
        },
      });
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      // Arrange
      const userData: UserRegisterDto = {
        username: 'testuser',
        password: 'testpassword',
        name: 'Test User',
      };

      const hashedPassword = hashString(userData.password);
      const createdUser: UserEntity = {
        id: 1,
        username: userData.username,
        password: hashedPassword,
        name: userData.name,
        role: UserRole.BUYER,
      };

      jest.spyOn(userQuery, 'createUser').mockResolvedValue(createdUser);

      // Act
      const result = await service.createUser(userData);

      // Assert
      expect(userQuery.createUser).toHaveBeenCalledWith(userData);
      expect(result).toEqual(createdUser);
    });
  });

  describe('me', () => {
    it('should return the user', async () => {
      // Arrange
      const user = {
        id: 1,
        username: 'testuser',
        name: 'Test User',
        role: UserRole.BUYER,
      };

      const userDb: UserEntity = {
        id: 1,
        username: 'testuser',
        password: 'hashedPassword',
        name: 'Test User',
        role: UserRole.BUYER,
      };

      jest.spyOn(RequestContext, 'getContext').mockReturnValueOnce({ user });
      jest.spyOn(userQuery, 'findUserByUsername').mockResolvedValueOnce(userDb);

      // Act
      const result = await service.me();

      // Assert
      expect(RequestContext.getContext).toHaveBeenCalled();
      expect(userQuery.findUserByUsername).toHaveBeenCalledWith(user.username);
      expect(result).toEqual(userDb);
    });
  });
  it('should verify token and find user by username', async () => {
    // Arrange
    const token = 'mockedToken';
    const decoded = {
      username: 'testuser',
      sub: 'testuser',
    };
    const userDb: UserEntity = {
      id: 1,
      username: 'testuser',
      password: 'hashedPassword',
      name: 'Test User',
      role: UserRole.BUYER,
    };

    jest.spyOn(jwtService, 'decode').mockReturnValueOnce(decoded);
    jest.spyOn(userQuery, 'findUserByUsername').mockResolvedValueOnce(userDb);

    // Act
    const result = await service.verifyToken(token);

    // Assert
    expect(jwtService.decode).toHaveBeenCalledWith(token);
    expect(userQuery.findUserByUsername).toHaveBeenCalledWith(decoded.username);
    expect(result).toEqual(userDb);
  });

  it('should throw UnauthorizedException when token is invalid', async () => {
    // Arrange
    const token = 'invalidToken';

    jest.spyOn(jwtService, 'decode').mockReturnValueOnce(null);

    // Act and Assert
    await expect(service.verifyToken(token)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
