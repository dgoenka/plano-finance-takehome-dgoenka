import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export interface IUser extends Document {
  readonly name: string;
  readonly surname: string;
  readonly username: string;
  readonly birthdate: string;
}

@Schema()
export class User {
  @Prop({
    required: true,
  })
  name: string;
  @Prop({
    required: true,
  })
  surname: string;
  @Prop({
    required: true,
    unique: true,
  })
  username: string;
  @Prop({
    required: true,
  })
  birthdate: string;

  @Prop({
    required: true,
    default: false,
  })
  blocked: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
