import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { PositionsService } from './position.service';

@Controller('positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Get()
  findAll() {
    console.log('GET /positions triggered');
    return this.positionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(`GET /positions/${id} triggered`);
    return this.positionsService.findOne(+id);
  }

  @Post()
  create(@Body() positionData: any) {
    console.log('POST /positions triggered', positionData);
    return this.positionsService.create(positionData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: any) {
    console.log(`PUT /positions/${id} triggered`, updateData);
    return this.positionsService.update(+id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log(`DELETE /positions/${id} triggered`);
    return this.positionsService.remove(+id);
  }
}