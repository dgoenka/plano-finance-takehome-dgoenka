import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { UserService } from './user';
import { CreateUserDto, UpdateUserDto } from './createuserdto';

const DEFAULT_USER_INITIALISERS = {
  blocked: false,
};

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Res() response, @Body() createStudentDto: CreateUserDto) {
    try {
      const user = await this.userService.create({
        ...DEFAULT_USER_INITIALISERS,
        ...createStudentDto,
      });
      return response.status(HttpStatus.CREATED).json({
        success: true,
        message: 'User has been created successfully',
        user,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        statusCode: 400,
        message: `Error: User not created!${err.message ? ' Message: ' + err.message : ''}`,
        error: 'Bad Request',
      });
    }
  }

  @Put('/:id')
  async updateUser(
    @Res() response,
    @Param('id') userId: string,
    @Body() updateStudentDto: UpdateUserDto,
  ) {
    try {
      const user = await this.userService.update(userId, updateStudentDto);
      return response.status(HttpStatus.OK).json({
        message: 'User has been successfully updated',
        user,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getUsers(@Res() response) {
    try {
      const studentData = await this.userService.findAll();
      return response.status(HttpStatus.OK).json({
        success: true,
        message: 'All users retrieved successfully',
        studentData,
      });
    } catch (err) {
      return response.status(err.status).json({
        success: false,
        ...err.response,
      });
    }
  }

  @Get('/search')
  async search(@Res() response, @Query() query: Record<string, unknown>) {
    try {
      const user = await this.userService.find(query);
      return response.status(HttpStatus.OK).json({
        message: 'User(s) found successfully',
        user,
      });
    } catch (err) {
      return response.status(404).json({ success: false, ...err.response });
    }
  }

  @Get('/:id')
  async getUser(@Res() response, @Param('id') id: string) {
    try {
      const user = await this.userService.getUser(id);
      return response.status(HttpStatus.OK).json({
        response: true,
        message: 'User retrieved successfully',
        user,
      });
    } catch (err) {
      return response
        .status(err.status)
        .json({ success: false, ...err.response });
    }
  }

  @Delete('/:id')
  async deleteUser(@Res() response, @Param('id') studentId: string) {
    try {
      const user = await this.userService.deleteUser(studentId);
      return response.status(HttpStatus.OK).json({
        success: true,
        message: 'User deleted successfully',
        user,
      });
    } catch (err) {
      return response.status(err.status).json({
        success: false,
        ...err.response,
      });
    }
  }
}
