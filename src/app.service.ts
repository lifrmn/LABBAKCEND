import {  BadRequestException, HttpException, Injectable, InternalServerErrorException, NotFoundException, Param, UploadedFile } from '@nestjs/common';
import { CreateMahasiswaDTO } from './dto/create-mahasiswa.dto';
import prisma from './prisma';
import { RegisterUserDTO } from './dto/register-user.dto';
import { hash } from 'crypto';
import { compareSync, hashSync } from 'bcrypt';
import { LoginUserDTO } from './dto/login-user.dto';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs';
import path, { extname, join } from 'path';
import { contains } from 'class-validator';
import { equal } from 'assert';


// import { User } from './entity/user.entity';
// import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs';


@Injectable()

export class AppService {

  constructor(private readonly jwtService: JwtService) {}
async register(data: RegisterUserDTO) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          username: data.username,
        },

      });
      if(user != null) {
        throw new BadRequestException("Username sudah digunakan");
      }
      console.log(data)
      
      const hash = hashSync(data.pasword, 10);

      const newUser = await prisma.user.create({
        data: {
          username: data.username,
          password: hash,
          role : "USER"
        },
      });
      return newUser;
    
  }catch (error) {
    console.log(error)
    if(error instanceof HttpException) throw error
    throw new  InternalServerErrorException("ada masaalah pada server");
  }
}

async searchMahasiswa( nim?: string) {
  try{
    const mahasiswa = await prisma.mahasiswa.findMany({
      where:{
        AND:[
          // nama?{nama:{contains:nama,mode:'insensitive'}}:{},
          nim?{nim:{equals:nim}}:{},
        ],
      },
    })
    return mahasiswa;
  }catch (error){
  throw new InternalServerErrorException('ada masalah pada server')
  }
}

async uploadMahasiswaFoto(nim: string, file: Express.Multer.File) {  {
  const mahasiswa = await prisma.mahasiswa.findFirst({ where: { nim } });
  if (!mahasiswa) throw new NotFoundException('Mahasiswa Tidak Ditemukan');

  if(!existsSync(join(__dirname, '../uploads/') )) {
    mkdirSync(join( __dirname, '../uploads/'))
  } 
  
  if (mahasiswa.foto_profile) {
    const filePath = join(__dirname, '../uploads/', mahasiswa.foto_profile);
    if (existsSync(filePath)) {
      rmSync(filePath);
    }
  }
  const uploadedFile = join(__dirname, '../uploads/');
  const fileExt = extname(file.originalname);
  const baseFilename = mahasiswa.nim;
  const uniqueSuffix = Date.now() +'-'+ Math.round(Math.random() * 1e9);
  const filename = `${baseFilename}-${uniqueSuffix}${fileExt}`;
  const filePath = `${uploadedFile}${filename}`;

  console.log(filePath)

  writeFileSync(filePath, file.buffer);
  await prisma.mahasiswa.update({
    where: { nim },
    data: { foto_profile: filename },
  });

  return filename;

}




}

async getMahasiswaFoto(nim: string) {
  const mahasiswa = await prisma.mahasiswa.findFirst({
      where: { nim },
  });

  if (!mahasiswa) throw new NotFoundException('Mahasiswa Tidak Ditemukan');
  return mahasiswa.foto_profile;
}



async auth(user_id : number) {
   try {
     const user = await prisma.user.findFirst({
      where : {
       id : user_id
      }
     })
      if(user == null) throw new NotFoundException("User Tidak Ditemukan")
     return user
    }catch(err) {
     if(err instanceof HttpException) throw err 
     throw new InternalServerErrorException("Terdapat Masalah Dari Server Harap Coba Lagi dalam beberapa menit")
    }
   }

async login(data: LoginUserDTO) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: data.username,
      },
    });
    if (user === null) {
      throw new NotFoundException("userName yang anda masukkan salah");
    }

    // const isPasswordValid = hashSync(data.password, user.password);
    if (compareSync(data.password, user.password) === false) {
      throw new BadRequestException("Password salah");
    }
    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
    }
    
    const token = await this.jwtService.signAsync(payload);
    return { 
      token : token, 
      user
    };
  
  } catch (error) {
    if (error instanceof HttpException) throw error;
    throw new InternalServerErrorException("Ada masalah pada server");
  }
}

  async getMahasiswa() {
    return await prisma.mahasiswa.findMany();
  }

  async getMahasiswaByNIM(nim : string) {
    const mahasiswa = await prisma.mahasiswa.findFirst({
      where : {
        nim
      }
    })

    if(mahasiswa == null) 
      throw new NotFoundException("Tidak Menemukan NIM")

    return mahasiswa

  }

  async addMahasiswa(data : CreateMahasiswaDTO) {
    await prisma.mahasiswa.create({
      data
    })

    return await prisma.mahasiswa.findMany()
  }

  async deleteMahasiswa(nim : string) {
    const mahasiswa = await prisma.mahasiswa.findFirst({
      where : {
        nim 
      }
    })

    if(mahasiswa == null) {
      throw new NotFoundException("Tidak Menemukan NIM")
    }

    await prisma.mahasiswa.delete({
      where : {
        nim 
      }
    })

    return await prisma.mahasiswa.findMany()
  }

  async updateMahasiswa(nim: string, data: CreateMahasiswaDTO) {
    // Cari mahasiswa berdasarkan NIM
    const mahasiswa = await prisma.mahasiswa.findFirst({
      where: { nim },
    });
  
  
    // Jika tidak ditemukan, lemparkan error
    if (mahasiswa === null) {
      throw new NotFoundException("Mahasiswa dengan NIM tersebut tidak ditemukan.");
    }
  await prisma.mahasiswa.update({
    // Perbarui data mahasiswa
      where: { nim

      },
      data:data
    });
  
    // Kembalikan data mahasiswa yang diperbarui
    return await prisma.mahasiswa.findMany();
  } 

  async getUsers() {
    return await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        role: true,
      },
    });
  }
}
