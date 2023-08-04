import { Injectable } from '@nestjs/common';
import { userDTO } from './user.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma : PrismaService){}

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

    async findAll(){
        //const users =  await this.prisma.$queryRaw`Select usr_codigo, usr_login, usr_senha from fr_usuario`
        const users = await this.prisma.fr_usuario.findMany()
        return users
    }

    async findOne(usr_login: string){
        const user = await this.prisma.fr_usuario.findUnique({
            where: {
                usr_login
            }
        })

        if(!user){
            throw new Error(`User ${usr_login} does not exist`)
        }

        return user
    }
}
