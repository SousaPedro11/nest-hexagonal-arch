import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { List } from './entities/list.entity';

@ApiTags('lists')
@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: List,
  })
  create(@Body() createListDto: CreateListDto) {
    return this.listsService.create(createListDto);
  }

  @Get()
  findAll() {
    return this.listsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListDto: UpdateListDto) {
    return this.listsService.update(+id, updateListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listsService.remove(+id);
  }
}
