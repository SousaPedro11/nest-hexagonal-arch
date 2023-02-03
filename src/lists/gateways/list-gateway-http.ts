import { HttpService } from '@nestjs/axios';
import { List } from '../entities/list.entity';
import { ListGatewayInterface } from './list-gateway-interface';
import { lastValueFrom } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ListGatewayHttp implements ListGatewayInterface {
  constructor(
    @Inject(HttpService)
    private httpService: HttpService,
  ) {}

  async create(list: List): Promise<List> {
    await lastValueFrom(this.httpService.post('lists', list));
    return list;
  }

  async findAll(): Promise<List[]> {
    const { data } = await lastValueFrom(this.httpService.get('lists'));
    return data.map((list: List) => new List(list.name, list.id));
  }

  async findByPk(id: number): Promise<List> {
    const { data } = await lastValueFrom(this.httpService.get(`lists/${id}`));
    return new List(data.name, data.id);
  }

  async update(id: number, list: List): Promise<List> {
    const response = await lastValueFrom(
      this.httpService.put(`lists/${id}`, list),
    );
    return response.data;
  }

  async remove(id: number): Promise<List> {
    const response = await lastValueFrom(
      this.httpService.delete(`lists/${id}`),
    );
    return response.data;
  }
}
