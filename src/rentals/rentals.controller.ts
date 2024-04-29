import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';

@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @Post('/api/cars/:id/rent')
  create(@Param('id') id: string,) {
    return this.rentalsService.create(id);
  }

  @Get()
  findAll() {
    return this.rentalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rentalsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRentalDto: UpdateRentalDto) {
    return this.rentalsService.update(+id, updateRentalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rentalsService.remove(+id);
  }
}
