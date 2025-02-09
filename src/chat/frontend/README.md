# Aplikasi Chat

Aplikasi chat sederhana yang dibangun dengan NestJS dan Socket.IO.

## Prasyarat

- Node.js dan npm terinstal
- `http-server` terinstal secara global

## Setup

### Backend

1. **masuk ke folder latihan-nest**:
   ```bash
   cd /C:/Users/BASO HAMZAH/latihan-nest
   
   

2. **Jalankan server NestJS**:
   ```bash
   npm run start:dev
   ```

   Server akan mendengarkan pada semua antarmuka jaringan (`0.0.0.0`) dan port 3000.

### Frontend

1. **Arahkan ke direktori frontend**:
   ```bash
   cd /C:/Users/BASO HAMZAH/latihan-nest/src/chat/frontend
   ```

2. **Jalankan `http-server`**:
   ```bash
   http-server -a 0.0.0.0 -p 8080
   ```

   Ini akan memulai server lokal yang mendengarkan pada semua antarmuka jaringan (`192.168.17.140`) dan port 8080.

## Mengakses Aplikasi

### Dari Perangkat yang Sama

Buka browser dan navigasikan ke:
```
http://localhost:8080/client.html
```

### Dari Perangkat Lain di Jaringan yang Sama

1. **Temukan alamat IP lokal Anda**:
   - Jalankan perintah berikut di terminal atau command prompt:
     ```bash
     ipconfig
     ```
   - Cari alamat IPv4 dari antarmuka jaringan yang terhubung ke jaringan lokal Anda (misalnya, `192.168.17.140`).

2. **Buka browser di perangkat lain**:
   - Pastikan perangkat terhubung ke jaringan yang sama.
   - Navigasikan ke:
     ```
     http://<alamat-ip-lokal-anda>:8080/client.html
     ```
   - Contoh:
     ```
     http://192.168.17.140:8080/client.html
     ```

## Debugging

### Periksa Log Konsol

- Buka konsol browser di kedua perangkat untuk memeriksa apakah ada kesalahan atau pesan.
- Di browser, tekan `F12` atau `Ctrl+Shift+I` untuk membuka alat pengembang, lalu buka tab "Console".

### Periksa Log Server

- Periksa terminal tempat server NestJS berjalan untuk melihat apakah ada log atau kesalahan.

## Catatan

- Pastikan kedua perangkat terhubung ke jaringan yang sama.
- Pastikan tidak ada firewall atau pembatasan jaringan yang memblokir koneksi.

## Kode Program

### /C:/Users/BASO HAMZAH/latihan-nest/src/main.ts

```typescript
// filepath: /C:/Users/BASO HAMZAH/latihan-nest/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: "*",
  });

  const config = new DocumentBuilder()
    .setTitle('LATIHAN NESTJS KELAS 5B')
    .setDescription('BASO HAMZAH - 105841106922')
    .setVersion('0.1')
    .addTag('LATIHAN-1')
    .addBearerAuth()
    .build();

  const documenFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, documenFactory);

  await app.listen(3000, '0.0.0.0'); // Listen on all network interfaces
}

bootstrap();
```

### /C:/Users/BASO HAMZAH/latihan-nest/src/chat/frontend/styles.css

```css
/* filepath: /C:/Users/BASO HAMZAH/latihan-nest/src/chat/frontend/styles.css */
body {
    font-family: Arial, sans-serif;
    background-color: #e5ddd5;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

#chat-container {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 400px;
    max-width: 100%;
    height: 600px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

#messages {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    background-color: #f7f7f7;
    display: flex;
    flex-direction: column;
}

#messages p {
    padding: 10px;
    border-radius: 4px;
    margin: 5px 0;
    max-width: 80%;
    word-wrap: break-word;
}

#messages p.received {
    background-color: #fff;
    align-self: flex-start;
}

#messages p.sent {
    background-color: #dcf8c6;
    align-self: flex-end;
}

#input-container {
    display: flex;
    padding: 10px;
    background-color: #ededed;
    border-top: 1px solid #ddd;
}

#messageInput {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 20px;
    margin-right: 10px;
}

#sendButton {
    padding: 10px 20px;
    border: none;
    background-color: #075e54;
    color: #fff;
    border-radius: 20px;
    cursor: pointer;
}

#sendButton:hover {
    background-color: #064e48;
}
```

### /C:/Users/BASO HAMZAH/latihan-nest/src/chat/frontend/client.html

```html
<!-- filepath: /C:/Users/BASO HAMZAH/latihan-nest/src/chat/frontend/client.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat Application</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="chat-container">
        <div id="messages"></div>
        <div id="input-container">
            <input type="text" id="messageInput" placeholder="Type your message here">
            <button id="sendButton">Send</button>
        </div>
    </div>

    <script src="https://cdn.socket.io/4.8.1/socket.io.min.js" 
            integrity="sha384-mkQ3/7FUtcGyoppY6bz/PORYoGqOl7/aSUMn2ymDOJcapfS6PHqxhRTMh1RR0Q6+"
            crossorigin="anonymous"></script>

    <script>
        const socket = io('http://192.168.17.140:3000', { // Use your laptop's IP address
            path: "/socket",
            WebTransport: ["websocket"]
        });

        const userId = Math.random().toString(36).substring(2, 15); // Generate a random user ID

        socket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        socket.on('chat-receive', (data) => {
            const { message, senderId } = data;
            console.log('Received message:', message);
            if (senderId !== userId) {
                const messagesDiv = document.getElementById('messages');
                const messageElement = document.createElement('p');
                messageElement.textContent = message;
                messageElement.classList.add('received');
                messagesDiv.appendChild(messageElement);
                messagesDiv.scrollTop = messagesDiv.scrollHeight;
            }
        });

        document.getElementById('sendButton').addEventListener('click', () => {
            const message = document.getElementById('messageInput').value.trim();
            if (message === '') {
                return; // Jangan kirim pesan jika input kosong
            }
            console.log('Sending message:', message);
            socket.emit("chat-send", { message: message, senderId: userId });

            const messagesDiv = document.getElementById('messages');
            const messageElement = document.createElement('p');
            messageElement.textContent = message;
            messageElement.classList.add('sent');
            messagesDiv.appendChild(messageElement);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;

            document.getElementById('messageInput').value = '';
        });
    </script>
</body>
</html>
```

### /C:/Users/BASO HAMZAH/latihan-nest/src/chat/dto/create-chat.dto.ts

```typescript
// filepath: /C:/Users/BASO HAMZAH/latihan-nest/src/chat/dto/create-chat.dto.ts
export class CreateChatDto {
  message: string;
}
```

### /C:/Users/BASO HAMZAH/latihan-nest/src/chat/chat.service.ts

```typescript
// filepath: /C:/Users/BASO HAMZAH/latihan-nest/src/chat/chat.service.ts
import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Injectable()
export class ChatService {
  private chats: { id: number, message: string }[] = [];
  private idCounter = 1;

  create(createChatDto: CreateChatDto) {
    const newChat = { id: this.idCounter++, ...createChatDto };
    this.chats.push(newChat);
    return newChat;
  }

  findAll() {
    return this.chats;
  }

  findOne(id: number) {
    return this.chats.find(chat => chat.id === id);
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    const chatIndex = this.chats.findIndex(chat => chat.id === id);
    if (chatIndex > -1) {
      this.chats[chatIndex] = { ...this.chats[chatIndex], ...updateChatDto };
      return this.chats[chatIndex];
    }
    return null;
  }

  remove(id: number) {
    const chatIndex = this.chats.findIndex(chat => chat.id === id);
    if (chatIndex > -1) {
      const removedChat = this.chats.splice(chatIndex, 1);
      return removedChat[0];
    }
    return null;
  }
}
```

### /C:/Users/BASO HAMZAH/latihan-nest/src/chat/chat.module.ts

```typescript
// filepath: /C:/Users/BASO HAMZAH/latihan-nest/src/chat/chat.module.ts
import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';

@Module({
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
```

### /C:/Users/BASO HAMZAH/latihan-nest/src/chat/chat.gateway.ts

```typescript
// filepath: /C:/Users/BASO HAMZAH/latihan-nest/src/chat/chat.gateway.ts
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: "*"
  },
  path: "/socket"
})
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}
  @WebSocketServer()
  server: Server;

  async handleConnection(socket: Socket) {
    console.log("Client connected:", socket.id);
  }

  async handleDisconnect(socket: Socket) {
    console.log("Client disconnected:", socket.id);
  }

  @SubscribeMessage("chat-send")
  async sendMessage(socket: Socket, data: any) {
    const { message, senderId } = data;
    console.log("Received message from client:", message);
    this.server.emit("chat-receive", { message, senderId });
  }

  @SubscribeMessage('createChat')
  create(@MessageBody() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @SubscribeMessage('findAllChat')
  findAll() {
    return this.chatService.findAll();
  }

  @SubscribeMessage('findOneChat')
  findOne(@MessageBody() id: number) {
    return this.chatService.findOne(id);
  }

  @SubscribeMessage('updateChat')
  update(@MessageBody() updateChatDto: UpdateChatDto) {
    return this.chatService.update(updateChatDto.id, updateChatDto);
  }

  @SubscribeMessage('removeChat')
  remove(@MessageBody() id: number) {
    return this.chatService.remove(id);
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: string): void {
    this.server.emit('message', payload);  // Kirim pesan ke semua client
  }
}
```
````

Dengan file README.md ini, Anda memiliki panduan lengkap dalam bahasa Indonesia tentang cara menjalankan aplikasi chat Anda dan mengaksesnya dari perangkat lain di jaringan yang sama. Pastikan untuk mengikuti langkah-langkah dengan cermat untuk memastikan semuanya berjalan dengan baik.