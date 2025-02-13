# Project Structure

latihan-nest/
│-- dist/
│-- node_modules/
│-- prisma/
│   └── schema.prisma
│-- src/
│   ├── chat/
│   │   ├── dto/
│   │   │   ├── create-chat.dto.ts
│   │   │   ├── update-chat.dto.ts
│   │   ├── entities/
│   │   │   ├── chat.entity.ts
│   │   ├── chat.gateway.spec.ts
│   │   ├── chat.gateway.ts
│   │   ├── chat.module.ts
│   │   ├── chat.service.spec.ts
│   │   ├── chat.service.ts
│   ├── dto/
│   │   ├── catatan.txt
│   │   ├── create-mahasiswa.dto.ts
│   │   ├── login-user.dto.ts
│   │   ├── register-user.dto.ts
│   │   ├── update-mahasiswa.dto.ts
│   ├── entity/
│   │   ├── user.entity.ts
│   ├── profile/
│   │   ├── profile.controller.spec.ts
│   │   ├── profile.controller.ts
│   │   ├── profile.module.ts
│   │   ├── profile.service.spec.ts
│   │   ├── profile.service.ts
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── auth-module.ts
│   ├── auth.guard.ts
│   ├── main.ts
│   ├── prisma.servis.ts
│   ├── prisma.ts
│   ├── user.decorator.ts
│-- test/
│   ├── app.e2e-spec.ts
│   ├── jest-e2e.json
│-- uploads/
│   ├── 105841106922-1738231723215-614657552.jpg
│-- .env
│-- .gitignore
│-- .prettierrc
│-- CATATAN
│-- nest-cli.json
│-- package-lock.json
│-- package.json
│-- README.md
│-- tsconfig.build.json
│-- tsconfig.json

Feel free to add more details about each file and directory as needed.

## Teknologi yang Digunakan di Projek Ini

Projek ini menggunakan beberapa teknologi dan pustaka berikut:

- **Node.js**: JavaScript runtime yang dibangun di atas mesin V8 Chrome.
- **NestJS**: Framework untuk membangun aplikasi server-side yang efisien dan skalabel.
- **TypeScript**: Superset dari JavaScript yang menambahkan tipe statis.
- **Prisma**: ORM (Object-Relational Mapping) untuk TypeScript dan Node.js.
- **Jest**: Framework pengujian JavaScript yang fokus pada kesederhanaan.
- **Prettier**: Code formatter yang mendukung berbagai bahasa pemrograman.
- **ESLint**: Linter untuk JavaScript dan TypeScript yang membantu menjaga kualitas kode.
- **Docker**: Platform untuk mengembangkan, mengirim, dan menjalankan aplikasi dalam container.

Pastikan untuk menginstal semua dependensi yang diperlukan dengan menjalankan perintah `npm install` sebelum memulai pengembangan.

## Instalasi Proyek Nest.js

Untuk memulai proyek Nest.js, ikuti langkah-langkah berikut:

1. **Clone repositori**:
    bash
    `git clone https://github.com/basohamzah24/LAB-BACKEND`

    Masuk ke Direktori Proyek
   ` cd latihan-nest`
    

2. **Instal dependensi**:
    bash
    npm install
    

3. **Konfigurasi environment**:
    Salin file `.env.example` menjadi `.env` dan sesuaikan konfigurasi sesuai kebutuhan Anda.
    contoh :
    `DATABASE_URL="postgresql://postgres:Frasydi137@103.151.145.175:5432/latihan_nestb?schema=105841106922"`

4. **Jalankan perintah ini untuk langsung menyinkronkan skema Prisma ke database**:
    bash
   ` npx prisma db push`


5. **Jalankan aplikasi**:
    bash
    `npm run start:dev`
    

Aplikasi sekarang berjalan di `http://localhost:3000`.

## Penjelasan Setiap File dan Direktori

Berikut adalah penjelasan singkat mengenai setiap file dan direktori yang ada di dalam proyek ini:

- **dist/**: Direktori output untuk file yang telah dikompilasi.
- **node_modules/**: Direktori yang berisi semua dependensi Node.js yang diinstal.
- **prisma/**: Direktori yang berisi file konfigurasi Prisma.
    - **schema.prisma**: Skema database Prisma.
- **src/**: Direktori utama untuk kode sumber aplikasi.
    - **chat/**: Modul untuk fitur chat.
        - **dto/**: Direktori untuk Data Transfer Objects.
            - **create-chat.dto.ts**: DTO untuk membuat chat baru.
            - **update-chat.dto.ts**: DTO untuk memperbarui chat.
        - **entities/**: Direktori untuk entitas.
            - **chat.entity.ts**: Entitas chat.
        - **chat.gateway.spec.ts**: File pengujian untuk gateway chat.
        - **chat.gateway.ts**: Mengatur komunikasi WebSocket untuk fitur chat. Menggunakan decorator `@WebSocketGateway` untuk mengatur konfigurasi WebSocket.
        - **chat.module.ts**: Modul chat.
        - **chat.service.spec.ts**: File pengujian untuk service chat.
        - **chat.service.ts**: Service untuk fitur chat.
    - **dto/**: Direktori untuk Data Transfer Objects umum.
        - **catatan.txt**: Catatan umum.
        - **create-mahasiswa.dto.ts**: DTO untuk membuat mahasiswa baru.
        - **login-user.dto.ts**: DTO untuk login pengguna.
        - **register-user.dto.ts**: DTO untuk registrasi pengguna.
        - **update-mahasiswa.dto.ts**: DTO untuk memperbarui mahasiswa.
    - **entity/**: Direktori untuk entitas umum.
        - **user.entity.ts**: Entitas pengguna.
    - **profile/**: Modul untuk fitur profil.
        - **profile.controller.spec.ts**: File pengujian untuk controller profil.
        - **profile.controller.ts**: Controller untuk fitur profil.
        - **profile.module.ts**: Modul profil.
        - **profile.service.spec.ts**: File pengujian untuk service profil.
        - **profile.service.ts**: Service untuk fitur profil.
    - **app.controller.spec.ts**: File pengujian untuk controller utama.
    - **app.controller.ts**: Controller utama aplikasi.
    - **app.module.ts**: Modul utama aplikasi.
    - **app.service.ts**: Service utama aplikasi.
    - **auth-module.ts**: Modul untuk autentikasi.
    - **auth.guard.ts**: Guard untuk autentikasi.
    - **main.ts**: File entry point aplikasi.
    - **prisma.servis.ts**: Service untuk Prisma.
    - **prisma.ts**: File konfigurasi Prisma.
    - **user.decorator.ts**: Dekorator untuk pengguna.
- **test/**: Direktori untuk file pengujian.
    - **app.e2e-spec.ts**: File pengujian end-to-end untuk aplikasi.
    - **jest-e2e.json**: Konfigurasi Jest untuk pengujian end-to-end.
- **uploads/**: Direktori untuk file yang diunggah.
    - **105841106922-1738231723215-614657552.jpg**: Contoh file yang diunggah.
- **.env**: File konfigurasi environment.
- **.gitignore**: File untuk mengabaikan file dan direktori tertentu dalam Git.
- **.prettierrc**: Konfigurasi untuk Prettier.
- **CATATAN**: File catatan umum.
- **nest-cli.json**: Konfigurasi untuk Nest CLI.
- **package-lock.json**: File lock untuk npm.
- **package.json**: File konfigurasi proyek Node.js.
- **README.md**: File dokumentasi proyek.
- **tsconfig.build.json**: Konfigurasi TypeScript untuk build.
- **tsconfig.json**: Konfigurasi utama TypeScript.

# Diagram Proyek

````mermaid`
---
title: Login User
---
stateDiagram-v2
    Input : { username, password }
    Request : POST /login
    Success : { token, user object, status: 201 }
    Failed : { msg, status: 401 }

    [*] --> Input
    Input --> Request
    Request --> Success : Credentials valid
    Request --> Failed : Credentials invalid


```mermaid`