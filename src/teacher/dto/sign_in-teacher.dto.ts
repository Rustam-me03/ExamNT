import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber, IsString,IsEmail, MinLength } from "class-validator";

export class TeacherSignInDto {

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string 
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
}
