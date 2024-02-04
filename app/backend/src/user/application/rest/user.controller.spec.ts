import { TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../../domain/user.service';
import { UserLoginDto, UserRegisterDto } from './user.request';
import { getAppModule } from 'test/fixture/module-fixture';
import { UserRole } from '@/user/model/entity/user.entity';

jest.mock('../../domain/user.service');

const mockLogin = jest.fn(),
  mockCreateUser = jest.fn(),
  mockMe = jest.fn();

UserService.prototype.login = mockLogin;
UserService.prototype.createUser = mockCreateUser;
UserService.prototype.me = mockMe;

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await getAppModule();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should call service.login with the provided userLoginDto', async () => {
      // Arrange
      const userLoginDto: UserLoginDto = {
        username: 'test',
        password: 'test',
      };

      // Act
      await controller.login(userLoginDto);

      // Assert
      expect(mockLogin).toHaveBeenCalledWith(userLoginDto);
    });

    it('should return the result of service.login', async () => {
      // Arrange
      const userLoginDto: UserLoginDto = {
        username: 'test',
        password: 'test',
      };
      const expectedResult = {
        token: 'test',
        user: {
          username: 'test',
          name: 'test',
          role: UserRole.BUYER,
        },
      };

      // Mock the service.login method
      mockLogin.mockResolvedValue(expectedResult);

      // Act
      const result = await controller.login(userLoginDto);

      // Assert
      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('user');
      expect(result.user.name).toBe(expectedResult.user.name);
      expect(result.user.name).toBe(expectedResult.user.name);
      expect(result.user.role).toBe(expectedResult.user.role);
    });
  });
  describe('register', () => {
    it('should call userService.createUser with the provided createUserDto', async () => {
      // Arrange
      const createUserDto: UserRegisterDto = {
        username: 'test',
        password: 'test',
        name: 'Test',
      };

      // Act
      await controller.register(createUserDto);

      // Assert
      expect(mockCreateUser).toHaveBeenCalledWith(createUserDto);
    });

    it('should return the result of userService.createUser', async () => {
      // Arrange
      const createUserDto: UserRegisterDto = {
        username: 'test',
        password: 'test',
        name: 'Test',
      };
      const expectedResult = {
        id: 1,
        username: 'test',
        name: 'Test',
      };

      // Mock the userService.createUser method
      mockCreateUser.mockResolvedValue(expectedResult);

      // Act
      const result = await controller.register(createUserDto);

      // Assert
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('username');
      expect(result).toHaveProperty('name');
      expect(result.username).toBe(expectedResult.username);
      expect(result.name).toBe(expectedResult.name);
    });
  });

  describe('me', () => {
    it('should call mockMe', async () => {
      // Arrange

      // Act
      await controller.me();

      // Assert
      expect(mockMe).toHaveBeenCalled();
    });

    it('should return the result of mockMe', async () => {
      // Arrange
      const expectedResult = {
        id: 1,
        username: 'test',
        name: 'Test',
      };

      // Mock the mockMe method
      mockMe.mockResolvedValue(expectedResult);

      // Act
      const result = await controller.me();

      // Assert
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('username');
      expect(result).toHaveProperty('name');
      expect(result.id).toBe(expectedResult.id);
      expect(result.username).toBe(expectedResult.username);
      expect(result.name).toBe(expectedResult.name);
    });
  });
});
