import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";

@Injectable()
export class TeacherService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createUserDto: CreateTeacherDto  ) {
      if (createUserDto.password != createUserDto.confirm_password) {
          throw new BadRequestException("parollar mos emas");
      }
      const hashedPassword = await bcrypt.hash(createUserDto.password, 7);
      const data = {
          age:createUserDto.birthday,
          gender:createUserDto.gender,
          email: createUserDto.email,
          hashedPassword,
      };
      const newUser = await this.prismaService.user.create({ data });
      return newUser;
  }

  findAll() {
      return this.prismaService.user.findMany();
  }

  async findOne(id: number) {
      const user = await this.prismaService.user.findUnique({
          where: { id },
      });
      if (!user) {
          throw new NotFoundException("Bunday yo'q");
      }
      return user;
  }
  async findByEmail(email: string) {
      const user = await this.prismaService.user.findUnique({
          where: { email },
      });
      return user;
  }

  async update(id: number, updateUserDto: UpdateTeacherDto) {
      this.findOne(id);
      return this.prismaService.user.update({
          where: { id },
          data: { ...updateUserDto },
      });
  }

  async remove(id: number) {
      const user = await this.findOne(id);
      return this.prismaService.user.delete({ where: { id } });
  }

  async updateRefreshToken(id: number, hashed_refresh_token: string | null) {
      const updatedUser = await this.prismaService.user.update(
          {
            where: { id },
            data:{ hashedToken:hashed_refresh_token },
          }
      );
  
      return updatedUser;
    }
}
