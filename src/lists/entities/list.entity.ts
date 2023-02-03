export class List {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(name: string, id?: number) {
    this.id = id;
    this.name = name;
  }
}
