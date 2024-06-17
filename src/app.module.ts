import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { BlockController } from './block/block.controller';
import { BlockModule } from './block/block.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserService } from './user/user';
import { UserSchema } from './user/user.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        uri: process.env.DATABASE_URL,
      }),
      inject: [ConfigService],
    }),
    BlockModule,
    UserModule,
    MongooseModule.forFeatureAsync([
      {
        name: 'users',
        useFactory: () => {
          const schema = UserSchema;
          schema.plugin(require('mongoose-unique-validator'), {
            message: 'expected to be unique.',
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [AppController, UserController, BlockController],
  providers: [AppService, UserService],
})
export class AppModule {}
