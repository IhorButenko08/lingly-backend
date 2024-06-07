import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SetService } from './set.service';
import flashcard from './interfaces/flashcard';

@Controller('set')
export class SetController {
  constructor(private readonly setService: SetService) {}

  @Post()
  async createSet(@Body() set: { name: string; set: flashcard[] }) {
    console.log(set.set)
    return await this.setService.createSet({
      name: set.name,
      set: set.set,
    });
  }

  @Get(':id')
  async getSetById(@Param() params: { id: string }) {
    return await this.setService.FindById(params.id);
  }
}


