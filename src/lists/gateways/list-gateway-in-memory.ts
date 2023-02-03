import { List } from '../entities/list.entity';
import { ListGatewayInterface } from './list-gateway-interface';

export class ListGatewayInMemory implements ListGatewayInterface {
  items: List[] = [];

  async create(list: List): Promise<List> {
    list.id = this.items.length + 1;
    this.items.push(list);

    return list;
  }
  async findAll(): Promise<List[]> {
    return this.items;
  }
  async findByPk(id: number): Promise<List> {
    const list = this.items.find((item) => item.id === id);
    if (!list) {
      throw new Error('List not found');
    }
    return list;
  }
  async update(id: number, list: List): Promise<List> {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('List not found');
    }
    list.id = id;
    this.items[index] = list;
    return list;
  }
  async remove(id: number): Promise<List> {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('List not found');
    }
    const list = this.items[index];
    this.items.splice(index, 1);
    return list;
  }
}
