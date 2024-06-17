import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateQuery } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './createuserdto';
import { isEmpty } from 'lodash';
import { IUser } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('users') private userModel: Model<IUser>) {}

  async create(createCatDto: CreateUserDto): Promise<IUser> {
    const createdCat = new this.userModel(createCatDto);
    return createdCat.save();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    const existingStudent = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true },
    );
    if (!existingStudent) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return existingStudent;
  }

  async updateAdvanced(
    id: string,
    updateQuery: UpdateQuery<IUser>,
  ): Promise<IUser> {
    const existingStudent = await this.userModel.findOneAndUpdate(
      { _id: id },
      updateQuery,
      { new: true, runValidators: true, context: 'query' },
    );
    if (!existingStudent) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return existingStudent;
  }

  async findAll(): Promise<IUser[]> {
    return this.userModel.find().exec();
  }

  async find(id: string): Promise<IUser> {
    const existingStudent = await this.userModel.findById(id).exec();
    if (!existingStudent) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return existingStudent;
  }

  async getUser(params): Promise<IUser[]> {
    const existingStudents = await this.userModel
      .find({
        $and: [
          ...(params.username ? [{ username: params.username }] : []),
          ...(params.birthdate ? [{ birthdate: params.birthdate }] : []),
        ],
      })
      .exec();
    if (isEmpty(existingStudents)) {
      throw new NotFoundException(`No users not found`);
    }
    return existingStudents;
  }

  async deleteUser(id: string): Promise<IUser> {
    const deletedStudent = await this.userModel.findByIdAndDelete(id);
    if (!deletedStudent) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return deletedStudent;
  }
}
