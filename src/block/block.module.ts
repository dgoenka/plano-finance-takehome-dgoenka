import { Module } from '@nestjs/common';
import { BlockController } from './block.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/user.schema';
import { UserService } from '../user/user';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'users', schema: UserSchema }])],
  controllers: [BlockController],
  providers: [UserService],
})
export class BlockModule {}
