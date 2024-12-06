import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { HomeworksService } from './homework.service';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homework.dto';

@Controller('homeworks')
export class HomeworksController {
  constructor(private readonly homeworksService: HomeworksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateHomeworkDto) {
    return this.homeworksService.createHomework(dto);
  }

  @Get()
  async findAll() {
    return this.homeworksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.homeworksService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateHomeworkDto) {
    return this.homeworksService.updateHomework(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number) {
    return this.homeworksService.deleteHomework(id);
  }
}
