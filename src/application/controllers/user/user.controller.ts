import { Body, Controller, Delete, Param, Put } from '@nestjs/common';
import { UserService } from '@services/user/user.service';
import { UpdateUserDto } from '@application/dto/user/update-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('/users/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.updateUser(id, body);
  }

  @Delete('/users/:id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
