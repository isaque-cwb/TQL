import { Body, Controller, Get, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { userDTO } from './user.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // async create(@Body() data: userDTO){
  //   return await this.userService.create(data)
  // }

  @Get('users')
  async findAll() {
    return await this.userService.findAll()
  }

  @Post()
  async findOne(@Body() data: userDTO) {
    return await this.userService.findOne(data.usr_login)
  }
}
