import { Module } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ListModel } from './entities/list.model';
import { HttpModule } from '@nestjs/axios';
import { ListGatewaySequelize } from './gateways/list-gateway-sequelize';
import { ListGatewayHttp } from './gateways/list-gateway-http';

@Module({
  imports: [
    SequelizeModule.forFeature([ListModel]),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
      baseURL: 'http://localhost:8000',
    }),
  ],
  controllers: [ListsController],
  providers: [
    ListsService,
    ListGatewaySequelize,
    ListGatewayHttp,
    {
      provide: 'ListPersistenceGateway',
      useClass: ListGatewaySequelize,
    },
    {
      provide: 'ListIntegrationGateway',
      useClass: ListGatewayHttp,
    },
  ],
})
export class ListsModule {}
