import { ListGatewayInMemory } from './gateways/list-gateway-in-memory';
import { ListsService } from './lists.service';

describe('ListsService', () => {
  let service: ListsService;
  let listPersistenceGateway: ListGatewayInMemory;
  let listIntegrationGateway: ListGatewayInMemory;

  beforeEach(async () => {
    listPersistenceGateway = new ListGatewayInMemory();
    listIntegrationGateway = new ListGatewayInMemory();
    service = new ListsService(listPersistenceGateway, listIntegrationGateway);
  });

  it('deve criar uma lista', async () => {
    const list = await service.create({ name: 'My List' });
    expect(listPersistenceGateway.items).toEqual([list]);
    expect(listIntegrationGateway.items).toEqual([list]);
  });
});
