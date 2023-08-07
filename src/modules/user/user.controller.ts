import { Body, Controller, Get, Post, Param } from '@nestjs/common'
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

  @Get()
  async findOne(@Body() data: userDTO) {
    const user = await this.userService.findOne(data.usr_login)

    if (!user) {
      throw new Error(`User ${data.usr_login} not found`)
    }

    return user
  }
}
