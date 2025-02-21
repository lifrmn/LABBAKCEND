// async login(data: LoginUserDto) {
//     try {
//       const user = await prisma.user.findFirst({
//         where: {
//           username: data.username,
//         },
//       });
//       if (user == null) throw new NotFoundException('Username Tidak Ditemukan');

//       const isPasswordValid = compareSync(data.password, user.password);
//       if (!isPasswordValid) throw new BadRequestException('Password Salah');

//       const payload = {
//         id: user.id,
//         username: user.username,
//         role: user.role, // Pastikan role ada di payload
//       };
//       const token = await this.jwtService.signAsync(payload);
//       return {
//         token: token,
//         user,
//       };
//     } catch (err) {
//       if (err instanceof HttpException) throw err;
//       throw new InternalServerErrorException('Ada Masalah Pada Server');
//     }
//   }