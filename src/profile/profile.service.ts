import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs';
import path, { extname } from 'path';
import prisma from 'src/prisma';
import { updatedMahasiswaDTO } from 'src/dto/update-mahasiswa.dto';
import { PrismaService } from 'src/prisma.servis';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {} // Use the injected prisma instance

  async uploadFile(file: Express.Multer.File, id: number) {
    const user = await this.prisma.user.findFirst({ // Correct usage of prisma instance
      where: {
        id: id,
      },
    });
    if (user == null) throw new NotFoundException('User Tidak Ditemukan');

    if (user.foto_profile != null) {
      const filePath = path.join(__dirname, '../../uploads/', user.foto_profile);
      if (existsSync(filePath)) {
        rmSync(filePath);
      }
    }
    const uploadPath = path.join(__dirname, '../../uploads/');
    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath);
    }

    const fileExt = extname(file.originalname);
    const baseFilename = user.username;
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = `${baseFilename}-${uniqueSuffix}${fileExt}`;
    const filePath = path.join(uploadPath, filename);

    writeFileSync(filePath, file.buffer);

    await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        foto_profile: filename,
      },
    });

    return { filename, path: filePath };
  }

  async sendMyFotoProfile(user_id: number) {
    const user = await this.prisma.user.findFirst({ // Correct usage of prisma instance
      where: {
        id: user_id,
      },
    });

    if (user == null) throw new NotFoundException('User Tidak Ditemukan');

    return user.foto_profile;
  }

  async updateProfile(nim: string, data: updatedMahasiswaDTO) {
    // Validasi jika `gambar` adalah URL kosong atau invalid
    if (data.gambar && !this.isValidUrl(data.gambar)) {
      throw new BadRequestException('URL gambar tidak valid');
    }

    return this.prisma.mahasiswa.update({
      where: { nim },
      data: {
        nama: data.nama,
        kelas: data.kelas,
        jurusan: data.jurusan,
        jenis_kelamin: data.jenis_kelamin,
        // gambar: data.gambar, // Ensure this matches your database schema
      },
    });
  }

  // Fungsi validasi untuk mengecek URL
  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  }
}