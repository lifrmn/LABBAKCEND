# Laporan Proyek Nest.js
    ## PENDAHULUAN

    ```
    Dalam era digital yang terus berkembang, pengembangan aplikasi berbasis web dan real-time menjadi semakin penting. Salah satu teknologi yang banyak digunakan untuk membangun aplikasi backend yang efisien dan skalabel adalah NestJS. NestJS adalah framework berbasis Node.js yang menggunakan TypeScript dan mengadopsi arsitektur modular, sehingga memudahkan pengembang dalam membangun, mengelola, dan memperluas aplikasi.

    Lab latihan ini bertujuan untuk memberikan pemahaman mendalam mengenai struktur proyek NestJS serta implementasi berbagai fitur penting, seperti autentikasi, pengelolaan database dengan Prisma, serta komunikasi real-time menggunakan WebSocket. Dengan mengikuti latihan ini, diharapkan peserta dapat memahami konsep dasar pengembangan backend modern serta mampu menerapkan best practices dalam pengembangan aplikasi menggunakan NestJS.

    Struktur proyek latihan ini mencakup berbagai modul, termasuk modul **Chat**, **Profile**, serta penggunaan **Prisma** sebagai ORM untuk pengelolaan database. Setiap bagian dalam proyek ini dirancang untuk membantu peserta memahami bagaimana membangun layanan backend yang modular, aman, dan dapat diandalkan.

    Melalui lab ini, peserta akan:
    1. Memahami struktur proyek dalam NestJS.
    2. Mengimplementasikan autentikasi pengguna.
    3. Menggunakan Prisma untuk mengelola database.
    4. Mengembangkan layanan berbasis WebSocket untuk komunikasi real-time.
    5. Menerapkan konsep DTO (Data Transfer Object) dan entity dalam pengelolaan data.

    Dengan mengikuti latihan ini, peserta diharapkan memiliki keterampilan dasar dalam pengembangan backend menggunakan NestJS dan mampu mengaplikasikan teknologi ini dalam proyek nyata.
    ```

    ## Struktur file dan penjelasan file
    📦LATIHAN-NEST
    ┃ 📦dist
    ┃ 📦node-# Project Structure
    📦LATIHAN-NEST
    ┃ 📦dist
    ┃ ┃ ┗ 📜... (Output untuk file yang telah dikompilasi)
    ┃ 📦node-modules
    ┃ ┃ ┗ 📜... (Direktori yang berisi semua dependensi Node.js yang diinstal)
    ┃ 📦prisma
    ┃ ┃ ┗ 📜schema.prisma (Skema database Prisma)
    ┃ 📦src
    ┃ ┣ 📂chat
    ┃ ┃ ┣ 📂dto
    ┃ ┃ ┃ ┣ 📜create-chat.dto.ts (DTO untuk membuat chat baru)
    ┃ ┃ ┃ ┗ 📜update-chat.dto.ts (DTO untuk memperbarui chat)
    ┃ ┃ ┣ 📂entities
    ┃ ┃ ┃ ┗ 📜chat.entity.ts (Entitas chat)
    ┃ ┃ ┣ 📜chat.gateway.spec.ts (File pengujian untuk gateway chat)
    ┃ ┃ ┣ 📜chat.gateway.ts (Mengatur komunikasi WebSocket untuk fitur chat)
    ┃ ┃ ┣ 📜chat.module.ts (Modul chat)
    ┃ ┃ ┣ 📜chat.service.spec.ts (File pengujian untuk service chat)
    ┃ ┃ ┗ 📜chat.service.ts (Service untuk fitur chat)
    ┃ ┣ 📂dto
    ┃ ┃ ┣ 📜catatan.txt (Catatan umum)
    ┃ ┃ ┣ 📜create-mahasiswa.dto.ts (DTO untuk membuat mahasiswa baru)
    ┃ ┃ ┣ 📜login-user.dto.ts (DTO untuk login pengguna)
    ┃ ┃ ┣ 📜register-user.dto.ts (DTO untuk registrasi pengguna)
    ┃ ┃ ┗ 📜update-mahasiswa.dto.ts (DTO untuk memperbarui mahasiswa)
    ┃ ┣ 📂entity
    ┃ ┃ ┗ 📜user.entity.ts (Entitas pengguna)
    ┃ ┣ 📂profile
    ┃ ┃ ┣ 📜profile.controller.spec.ts (File pengujian untuk controller profil)
    ┃ ┃ ┣ 📜profile.controller.ts (Controller untuk fitur profil)
    ┃ ┃ ┣ 📜profile.module.ts (Modul profil)
    ┃ ┃ ┣ 📜profile.service.spec.ts (File pengujian untuk service profil)
    ┃ ┃ ┗ 📜profile.service.ts (Service untuk fitur profil)
    ┃ ┣ 📜app.controller.spec.ts (File pengujian untuk controller utama)
    ┃ ┣ 📜app.controller.ts (Controller utama aplikasi)
    ┃ ┣ 📜app.module.ts (Modul utama aplikasi)
    ┃ ┣ 📜app.service.ts (Service utama aplikasi)
    ┃ ┣ 📜auth-module.ts (Modul untuk autentikasi)
    ┃ ┣ 📜auth.guard.ts (Guard untuk autentikasi)
    ┃ ┣ 📜main.ts (File entry point aplikasi)
    ┃ ┣ 📜prisma.servis.ts (Service untuk Prisma)
    ┃ ┣ 📜prisma.ts (File konfigurasi Prisma)
    ┃ ┗ 📜user.decorator.ts (Dekorator untuk pengguna)
    ┃ 📦test
    ┃ ┣ 📜app.e2e-spec.ts (File pengujian end-to-end untuk aplikasi)
    ┃ ┗ 📜jest-e2e.json (Konfigurasi Jest untuk pengujian end-to-end)
    ┃ 📦uploads
    ┃ ┗ 📜105841106922-1738231723215-614657552.jpg (Contoh file yang diunggah)
    ┃ ┣ 📜.env (File konfigurasi environment)
    ┃ ┣ 📜.gitignore (File untuk mengabaikan file dan direktori tertentu dalam Git)
    ┃ ┣ 📜.prettierrc (Konfigurasi untuk Prettier)
    ┃ ┣ 📜nest-cli.json (Konfigurasi untuk Nest CLI)
    ┃ ┣ 📜package-lock.json (File lock untuk npm)
    ┃ ┣ 📜package.json (File konfigurasi proyek Node.js)
    ┃ ┣ 📜README.md (File dokumentasi proyek)
    ┃ ┣ 📜tsconfig.build.json (Konfigurasi TypeScript untuk build)
    ┗ ┗ 📜tsconfig.json (Konfigurasi utama TypeScript)


    ## Teknologi yang Digunakan di Projek Ini

    Projek ini menggunakan beberapa teknologi dan pustaka berikut:
    ```
    - Node.js: JavaScript runtime yang dibangun di atas mesin V8 Chrome.
    - *NestJS: Framework untuk membangun aplikasi server-side yang efisien dan skalabel.
    - TypeScript: Superset dari JavaScript yang menambahkan tipe statis.
    - Prisma: ORM (Object-Relational Mapping) untuk TypeScript dan Node.js.
    - Jest: Framework pengujian JavaScript yang fokus pada kesederhanaan.
    - Prettier: Code formatter yang mendukung berbagai bahasa pemrograman.
    - ESLint: Linter untuk JavaScript dan TypeScript yang membantu menjaga kualitas kode.
    - Docker: Platform untuk mengembangkan, mengirim, dan menjalankan aplikasi dalam container.

    Pastikan untuk menginstal semua dependensi yang diperlukan dengan menjalankan perintah `npm install` sebelum memulai pengembangan.
    ```
    ## Diagram proyek
    ````mermaid
    ---
    title: Login User
    ---
    stateDiagram-v2
        [*] --> InputLogin : Masukkan username & password
        InputLogin --> RequestLogin : Kirim POST /login
        RequestLogin --> SuccessLogin : Kredensial valid
        RequestLogin --> FailedLogin : Kredensial tidak valid
        SuccessLogin --> ResponseSuccessLogin : Token dan data user diterima (201)
        FailedLogin --> ResponseFailedLogin : Login gagal, kredensial salah (401)
        ResponseSuccessLogin --> [*]
        ResponseFailedLogin --> [*]
    ````

    ````mermaid
    ---
    title: Register
    ---
    stateDiagram-v2
        [*] --> InputRegister : Masukkan username, email & password
        InputRegister --> RequestRegister : Kirim POST /register
        RequestRegister --> SuccessRegister : Registrasi berhasil
        RequestRegister --> FailedRegister : Registrasi gagal
        SuccessRegister --> ResponseSuccessRegister : Token dan data user diterima (201)
        FailedRegister --> ResponseFailedRegister : Registrasi gagal, data tidak valid (400)
        ResponseSuccessRegister --> [*]
        ResponseFailedRegister --> [*]
    ````
    ````mermaid
     ---
    title: SearchMahasiswa
    ---
    stateDiagram-v2
        [*] -->SearchMahasiswa : Masukkan NIM (Opsional)
        InputSearchMahasiswa --> RequestSearchMahasiswa : Kirim GET /mahasiswa
        RequestSearchMahasiswa --> SuccessSearchMahasiswa : Mahasiswa ditemukan (200)
        RequestSearchMahasiswa --> FailedSearchMahasiswa : Mahasiswa tidak ditemukan (401)
        SuccessSearchMahasiswa --> ResponseSuccessSearchMahasiswa : Data mahasiswa
        FailedSearchMahasiswa --> ResponseFailedSearchMahasiswa : Mahasiswa tidak ditemukan
        ResponseSuccessSearchMahasiswa --> [*]
        ResponseFailedSearchMahasiswa --> [*]

    ````
    ```mermaid
    ---
    title: auth
    ---
    stateDiagram-v2
        cookie : Cookie[token]
        resultFailed : {msg as string, status = false}
        result : {msg as object\n(username as string,\nuuid as string)}
        [*] --> cookie
        cookie --> success
        success --> result
        cookie --> failed
        failed --> resultFailed
    ```

    ## Instalasi Proyek Nest.js

    Untuk memulai proyek Nest.js, ikuti langkah-langkah berikut:

    1. **Clone repositori**:
        bash
        ```
        git clone https://github.com/basohamzah24/LAB-BACKEND
        ```

    2. **Masuk ke Direktori Proyek**:
        bash
        cd latihan-nest
        ```

    3. **Instal dependensi**:
        bash
        ```
        npm install
        ```

    4. **Rubah nilai dari DATABASE_URL di file .env**
        ```
        DATABASE_URL = [url dari database]
        ```

    5. **Jalankan perintah ini untuk langsung menyinkronkan skema Prisma ke database**:
        bash
    ```
    npx prisma generate
    ```


    7. **Jalankan aplikasi**:
        bash
    ```
        npm run start:dev
    ```
    ```
    Aplikasi sekarang berjalan di `http://localhost:3000`.
    ```

