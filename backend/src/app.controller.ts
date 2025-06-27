import { Controller, Get } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectConnection() private readonly connection: Connection
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('db-ping')
  async dbPing() {
    const isConnected = this.connection.readyState === 1;
    const stateMap = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting',
    };
    return {
      connected: isConnected,
      state: this.connection.readyState,
      stateName: stateMap[this.connection.readyState as keyof typeof stateMap],
      database: this.connection.name,
      host: this.connection.host,
      port: this.connection.port,
      timestamp: new Date().toISOString(),
    };
  }
}
