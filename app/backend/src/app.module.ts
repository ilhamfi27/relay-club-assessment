import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configModuleOpts } from 'src/config/config.options';
import { SupabaseModule } from '@/supabase/supabase.module';
import { ProductModule } from '@/product/product.module';
import { UserModule } from './user/user.module';
import { RouteInfo } from '@nestjs/common/interfaces';
import { AuthMiddleware } from './user/application/middleware/user.middleware';
import { UserService } from './user/domain/user.service';
import { JwtService } from '@nestjs/jwt';
import { CartModule } from './cart/cart.module';
import { DiscountRulesModule } from './discount-rules/discount-rules.module';
import { UserQuery } from './user/infrastructure/db/user.query';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOpts),
    ProductModule,
    SupabaseModule,
    UserModule,
    CartModule,
    DiscountRulesModule,
  ],
  controllers: [AppController],
  providers: [UserService, UserQuery, JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const paths = ['products', 'products/**', 'carts', 'carts/**'];
    const forRoutes: RouteInfo[] = paths.flatMap((path) => {
      const methods = [
        RequestMethod.POST,
        RequestMethod.PUT,
        RequestMethod.DELETE,
        RequestMethod.PATCH,
      ];
      return methods.map((method) => ({ method, path }));
    });

    const specificRoutes: RouteInfo[] = [
      { method: RequestMethod.GET, path: 'users/me' },
      { method: RequestMethod.GET, path: 'carts' },
      { method: RequestMethod.GET, path: 'carts/checkout' },
    ];

    const specificExcludedRoutes: RouteInfo[] = [
      { method: RequestMethod.POST, path: 'users/login' },
      { method: RequestMethod.POST, path: 'users' },
    ];

    consumer
      .apply(AuthMiddleware)
      .exclude(...specificExcludedRoutes)
      .forRoutes(...forRoutes, ...specificRoutes);
  }
}
