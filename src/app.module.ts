import { Module } from '@nestjs/common';
import { DrizzleModule } from './drizzle/drizzle.module';
import { PostModule } from './post/post.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DrizzleModule,
    PostModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
