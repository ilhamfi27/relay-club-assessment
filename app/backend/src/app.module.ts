import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configModuleOpts } from 'src/config/config.options';
import { SupabaseModule } from '@/supabase/supabase.module';
import { ProductModule } from '@/product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOpts),
    ProductModule,
    SupabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
