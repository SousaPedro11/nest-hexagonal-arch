import { List } from '../entities/list.entity';

export interface ListGatewayInterface {
  create(list: List): Promise<List>;
  findAll(): Promise<List[]>;
  findByPk(id: number): Promise<List>;
  update(id: number, list: List): Promise<List>;
  remove(id: number): Promise<List>;
}
