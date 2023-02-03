import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ListsModule } from './lists/lists.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ListModel } from './lists/entities/list.model';

@Module({
  imports: [
    ListsModule,
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      host: ':memory:',
      models: [ListModel],
      autoLoadModels: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
