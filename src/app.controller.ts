import { Body, Controller, Delete, Get, Post, Param, Put, Res, UseGuards, UseInterceptors, UploadedFile, BadRequestException, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { CreateMahasiswaDTO} from './dto/create-mahasiswa.dto';
import { RegisterUserDTO } from './dto/register-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { type } from 'os';
import { Response } from 'express';
import { UserDecorator } from './user.decorator';
import { User } from './entity/user.entity';
import { AuthGuard } from './auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("register")
  @ApiBody({
    type: RegisterUserDTO 
  })
  RegisterUser(@Body() data: RegisterUserDTO){
    return this.appService.register(data);
  }

  @Post("login")
  @ApiBody({ type: LoginUserDTO })
  async loginUser(@Body() data: LoginUserDTO,
  @Res({passthrough:true}) res : Response){
    const result = await this.appService.login(data);
    res.cookie("token", result.token);
    return this.appService.login(data);
  } 

  @Get('users')
  getUsers() {
    return this.appService.getUsers();
  }
  
  @Get("/auth")
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  auth(@UserDecorator() user : User){ {
  return user
 }
}

@Post("mahasiswa")
@ApiBody({type: CreateMahasiswaDTO})
createMahasiswq(@Body() data : CreateMahasiswaDTO){//mengambil data dari CreateMahasiswaDTO
  return this.appService.addMahasiswa(data);//mengembalikan nilai array mahasiswa
}

@Get("mahasiswa")
getHello() {
  return this.appService.getMahasiswa();//mengembalikan nilai array mahasiswa
}

  @Get('mahasiswa/search')
  async searchMahasiswa(
    // @Query('nama')nama?:string,
    @Query('nim')nim? : string
  ){
    return this.appService.searchMahasiswa(nim)
  }

  @Post('mahasiswa/:nim/upload')
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadMahasiswaFoto(@UploadedFile() file: Express.Multer.File, @Param('nim') nim: string) {
    if (!file) throw new BadRequestException('File tidak boleh kosong');
    return this.appService.uploadMahasiswaFoto(nim, file);
  }

 

  @Get('mahasiswa/:nim/foto')
  async getMahasiswaFoto(@Param('nim') nim: string, @Res() res: Response) {
    const filename = await this.appService.getMahasiswaFoto(nim);
    return res.sendFile(filename, { root: 'uploads' });
  }



 

 


  


  @Get("mahasiswa/:nim")
  getMahasiswaByNim(@Param("nim") nim: string) {
    return this.appService.getMahasiswaByNIM(nim);
  }


 //DELETE localhost:3000/mahasiswa/105841104222
@Delete("mahasiswa/:nim")
  deleteMahasiswa(@Param("nim")nim : string){//membuat method deleteMahasiswa
    return this.appService.deleteMahasiswa(nim);//baris ini akan mengembalikan nilai array mahasiswa
  } 
  
  @Put("mahasiswa/:nim")
  @ApiBody({ type: CreateMahasiswaDTO })
  editMahasiswa(@Param("nim") nim: string, @Body() data: CreateMahasiswaDTO) {
    return this.appService.updateMahasiswa(nim, data);
  }
 
  
}
  