import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches, IsNotEmpty, Length } from "class-validator";

export class LoginUserDTO {
  @ApiProperty({
    description: 'Username pengguna untuk login',
    type: String,
    example: 'BASOHAMZAH',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\S*$/i, { message: 'Username tidak boleh mengandung spasi' })
  @Length(3, 100, { message: 'Username harus memiliki panjang antara 3 hingga 100 karakter' })
  username: string;

  @ApiProperty({
    description: 'Password pengguna untuk login',
    type: String,
    example: 'baso240405',
  })
  @IsString()
  @IsNotEmpty({ message: 'Password tidak boleh kosong' })
  @Length(8, 100, { message: 'Password harus memiliki panjang minimal 8 karakter' })
  password: string;
}
