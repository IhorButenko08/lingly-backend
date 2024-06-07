import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { SetService } from '../../set.service';
import { SessionService } from './sessions/session.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WritingEventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly setService: SetService,
    private readonly sessionService: SessionService,
  ) {}

  @WebSocketServer() io: Server;
  private readonly logger = new Logger(WritingEventsGateway.name);

  afterInit() {
    this.logger.log('Initialized');
  }

  handleConnection(client: any, ...args: any[]) {
    this.logger.log(`Client id: ${client.id} connected`);
  }

  handleDisconnect(client: any) {
    this.logger.log(`Client id: ${client.id} disconnected`);
  }

  @SubscribeMessage('write:create')
  async create(
    @MessageBody('id') id: string,
    @MessageBody('uuid') uuid: string,
    @ConnectedSocket() client: any,
  ) {
    const writeSet = await this.setService.FindById(id);
    client.emit(
      'write:state',
      this.sessionService.createNewSession(uuid, writeSet),
    );
  }

  @SubscribeMessage('write:request')
  async find(
    @MessageBody('uuid') uuid: string,
    @ConnectedSocket() client: any,
  ) {
    client.emit('write:response', await this.sessionService.findSession(uuid));
  }

  @SubscribeMessage('write:answer')
  async answer(
    @MessageBody('answer') answer: { answer: string },
    @MessageBody('uuid') uuid: string,
    @ConnectedSocket() client: any,
  ) {
    client.emit(
      'write:result',
      this.sessionService.checkAnswer(uuid, answer.answer),
    );
    this.logger.log(answer.answer);
  }
}
