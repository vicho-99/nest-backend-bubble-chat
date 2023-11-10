
import { jwtConstants } from '@/core/config/jwt/constants';
import { JwtService } from '@nestjs/jwt';

import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;

  constructor(private readonly jwtService: JwtService) { }

  private adminUsers: string[] = [];
  private clientUsers: string[] = [];

  async handleConnection(client: Socket, ...args: any[]) {

    try {

      const clientType: string = await this.getClientType(client);
      const clientId: string = await this.getClientId(client);

      await this.validateType(clientType);

      if (clientType === 'admin') {
        
        await this.validateToken(client);

        console.log('Administrador autenticado:', clientId);

        client.join('room:admins');

        this.adminUsers.push(clientId)

        await this.notifyChatAvailable(client);

      }

      if (clientType === 'client') {
        console.log('Usuario genérico conectado:', clientId);
        client.join('room:clients');
      }

    } catch (error) {
      console.log(error)
      client.disconnect(true)
    }

  }

  async handleDisconnect(client: Socket) {

    console.log("disconnect")

    await this.disconnectedUser(client);


  }

  private async getClientType(client: Socket): Promise<string> {
    return client.handshake.headers?.type.toString()
  }

  private async getClientId(client: Socket): Promise<string> {
    return client.id;
  }

  private async getHeaderToken(client: Socket): Promise<string> {
    return client.handshake.headers?.token?.toString();
  }

  private async chatAvailable(): Promise<boolean> {
    console.log("lrnht:  " + this.adminUsers.length)
    return this.adminUsers.length > 0 ? true : false;
  }

  private async disconnectedUser(client: Socket) {

    const clientType = await this.getClientType(client);
    const clientId = await this.getClientId(client);

    if (clientType === "admin") {
      this.adminUsers = this.adminUsers.filter(e => e !== clientId)
      await this.notifyChatAvailable(client);
    }

    if (clientType === "user") {
      this.clientUsers = this.clientUsers.filter(e => e !== clientId)
    }

  }

  private async validateType(clientType: string) {

    if (!clientType)
      throw new Error("No Type");

    if (clientType !== 'admin' && clientType !== 'client')
      throw new Error('Tipo de usuario no válido');

  }

  private async validateToken(client: Socket) {
    try {
      const authToken: string = await this.getHeaderToken(client);
      if (!authToken)
        throw new Error("No token");
      await this.jwtService.verifyAsync(authToken, {
        secret: jwtConstants.secret,
      });
    } catch (error) {
      throw new Error("No valid token")
    }
  }

  private async notifyChatAvailable(client: Socket) {

    client.to("room:clients").emit('chatAvailable', await this.chatAvailable());

  }

}