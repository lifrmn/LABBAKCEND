import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches,length,IsNotEmpty, Length } from "class-validator";

export class RegisterUserDTO {

    @ApiProperty({
        description: 'username',
        type: String,
        example: 'BASOHAMZAH'
    })

    @IsString()
    @IsNotEmpty()   
    @Matches(/^\S*$/i)
    @Length(3, 100)
    username: string;

    @ApiProperty({
        description: 'password',
        type: String,
        example: 'baso240405'
    })

    @IsString()
    @IsNotEmpty()
    @Matches(/^\S*$/i)
    @Length(3, 100)
    pasword: string;
}
