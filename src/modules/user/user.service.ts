import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // async create (data: userDTO) {

  //     const userExists = await this.prisma.fr_usuario.findFirst({
  //         where:{
  //             usr_login : data.usr_login
  //         }
  //     })

  //     if (userExists){
  //         throw new Error(`User ${data.usr_login} already exists`)
  //     }

  //     const user = await this.prisma.fr_usuario.create({
  //         data
  //      })

  //      return user
  // }

  async findAll() {
    //const users =  await this.prisma.$queryRaw`Select usr_codigo, usr_login, usr_senha from fr_usuario`
    const users = await this.prisma.fr_usuario.findMany({
      select: {
        usr_codigo: true,
        usr_login: true,
        usr_senha: true
      }
    })

    return users
  }

  async findOne(usr_login: string) {
    const user = await this.prisma.fr_usuario.findUnique({
      where: {
        usr_login
      }
    })

    if (!user) {
      throw new Error(`User ${usr_login} does not exist`)
    }

    const imageBase64 = user.usr_foto ? user.usr_foto.toString('base64') : null

    const userData = {
      usr_nome: user.usr_nome,
      usr_login: user.usr_login,
      usr_senha: user.usr_senha,
      usr_celular: user.usr_celular,
      usr_email: user.usr_email,
      usr_foto: imageBase64,
      usr_codigo: user.usr_codigo
    }
    return userData
  }
}
