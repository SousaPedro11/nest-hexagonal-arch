import { InjectModel } from '@nestjs/sequelize';
import { List } from '../entities/list.entity';
import { ListModel } from '../entities/list.model';
import { ListGatewayInterface } from './list-gateway-interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListGatewaySequelize implements ListGatewayInterface {
  constructor(
    @InjectModel(ListModel)
    private readonly listModel: typeof ListModel,
  ) {}
  async create(list: List): Promise<List> {
    const listModel = await this.listModel.create(list);
    list.id = listModel.id;
    return list;
  }
  async findAll(): Promise<List[]> {
    const listModels = await this.listModel.findAll();
    return listModels.map(
      (listModel) => new List(listModel.name, listModel.id),
    );
  }
  async findByPk(id: number): Promise<List> {
    const listModel = await this.listModel.findByPk(id);
    if (!listModel) {
      throw new Error('List not found');
    }
    return new List(listModel.name, listModel.id);
  }
  update(): Promise<List> {
    throw new Error('Method not implemented.');
  }
  remove(): Promise<List> {
    throw new Error('Method not implemented.');
  }
}
