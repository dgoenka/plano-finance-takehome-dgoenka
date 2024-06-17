import { Controller, HttpStatus, Param, Put, Res } from '@nestjs/common';
import { UserService } from '../user/user';

@Controller('block')
export class BlockController {
  constructor(private readonly userService: UserService) {}

  @Put('/:id')
  async toggleBlock(@Res() response, @Param('id') userId: string) {
    try {
      const user = await this.userService.updateAdvanced(userId, [
        { $set: { blocked: { $eq: [false, '$blocked'] } } },
      ]);
      return response.status(HttpStatus.OK).json({
        message: "User's block status has been successfully toggled",
        user,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
