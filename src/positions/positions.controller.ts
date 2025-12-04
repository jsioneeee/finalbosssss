import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { PositionsService } from './positions.service';

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
  async update(@Param('id') id: string, @Body() updateData: any) {
    console.log(`PUT /positions/${id} triggered`, updateData);
    await this.positionsService.update(+id, updateData);
    return { message: 'Position updated successfully' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    console.log(`DELETE /positions/${id} triggered`);
    await this.positionsService.remove(+id);
    return { message: 'Position deleted successfully' };
  }
} 


// import {
//   Controller,
//   Get,
//   Post,
//   Param,
//   Body,
//   Put,
//   Delete,
//   BadRequestException,
// } from '@nestjs/common';
// import { PositionsService } from './positions.service';

// @Controller('positions')
// export class PositionsController {
//   constructor(private readonly positionsService: PositionsService) {}

//   @Get()
//   async findAll() {
//     console.log('GET /positions triggered');
//     return await this.positionsService.findAll();
//   }

//   @Get(':id')
//   async findOne(@Param('id') id: string) {
//     console.log(`GET /positions/${id} triggered`);
//     const result = await this.positionsService.findOne(+id);
//     if (!result) throw new BadRequestException('Position not found');
//     return result;
//   }

//   @Post()
//   async create(@Body() positionData: any) {
//     console.log('POST /positions triggered', positionData);

//     if (!positionData.position_code || !positionData.position_name) {
//       throw new BadRequestException('Missing position_code or position_name');
//     }

//     return await this.positionsService.create(positionData);
//   }

//   @Put(':id')
//   async update(@Param('id') id: string, @Body() updateData: any) {
//     console.log(`PUT /positions/${id} triggered`, updateData);

//     if (!updateData.position_code || !updateData.position_name) {
//       throw new BadRequestException('Missing position_code or position_name');
//     }

//     await this.positionsService.update(+id, updateData);
//     return { message: 'Position updated successfully' };
//   }

//   @Delete(':id')
//   async remove(@Param('id') id: string) {
//     console.log(`DELETE /positions/${id} triggered`);
//     await this.positionsService.remove(+id);
//     return { message: 'Position deleted successfully' };
//   }
// }