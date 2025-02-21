import { ApiProperty } from "@nestjs/swagger";
import { Jenis_Kelamin } from "@prisma/client";
import { IsString, IsNotEmpty, Length, IsEnum, IsOptional } from "class-validator";

export class updatedMahasiswaDTO {
    @ApiProperty({
        description: "Nim",
        type: String,
        example: "2022010101"
    })
    @IsString()
    @IsNotEmpty()
    nim: string;

    @ApiProperty({
        description: "Nama mahasiswa",
        type: String,
        example: "BASO HAMZAH"
    })
    @IsString()
    @IsNotEmpty()
    nama: string;

    @ApiProperty({
        description: "Kelas mahasiswa",
        type: String,
        example: "5B"
    })
    @IsString()
    @IsNotEmpty()
    @Length(1, 50)
    kelas: string;

    @ApiProperty({
        description: "Jurusan mahasiswa",
        type: String,
        example: "INFORMATIKA"
    })
    @IsString()
    @IsNotEmpty()
    @Length(1, 50)
    jurusan: string;

    @ApiProperty({
        description: "Jenis Kelamin",
        enum: Jenis_Kelamin,
        example: "L",
    })
    @IsEnum(Jenis_Kelamin)
    jenis_kelamin: Jenis_Kelamin;

    @ApiProperty({
        description: "URL gambar/foto mahasiswa",
        type: String,
        example: "https://example.com/path/to/profile-image.jpg",
        required: false,
    })
    @IsString()
    @IsOptional()
    gambar?: string; // Ensure this matches the Prisma schema property
}
