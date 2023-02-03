import { Inject, Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { ListGatewayInterface } from './gateways/list-gateway-interface';
import { List } from './entities/list.entity';

@Injectable()
export class ListsService {
  constructor(
    @Inject('ListPersistenceGateway')
    private listPersistenceGateway: ListGatewayInterface, // Port gateway
    @Inject('ListIntegrationGateway')
    private listIntegrationGateway: ListGatewayInterface, // Port gateway
  ) {}

  async create(createListDto: CreateListDto) {
    const list = new List(createListDto.name);
    await this.listPersistenceGateway.create(list);
    await this.listIntegrationGateway.create(list);
    return list;
  }

  findAll() {
    return this.listPersistenceGateway.findAll();
  }

  async findOne(id: number) {
    const list = await this.listPersistenceGateway.findByPk(id);
    if (!list) {
      throw new Error('List not found');
    }
    return list;
  }

  async update(id: number, updateListDto: UpdateListDto) {
    const list = new List(updateListDto.name, id);
    await this.listPersistenceGateway.update(id, list);
    await this.listIntegrationGateway.update(id, list);
    return list;
  }

  async remove(id: number) {
    await this.listPersistenceGateway.remove(id);
  }
}
