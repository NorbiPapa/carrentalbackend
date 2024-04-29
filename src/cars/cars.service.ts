import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CarsService {
  constructor(private readonly db: PrismaService){}
  async create(createCarDto: CreateCarDto) {
    try {
      const createdCar = await this.db.cars.create({
        data: {
          license_plate_number: createCarDto.license_plate_number,
          brand: createCarDto.brand,
          model: createCarDto.model,
          daily_cost: createCarDto.daily_cost,
          created_at: new Date(), 
        },
        select: {
          id: true,
          license_plate_number: true,
          brand: true,
          model: true,
          daily_cost: true,
        },
      });

      return createdCar;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Validation failed',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  findAll() {
    return this.db.cars.findMany({
      select: {
        id: true,
        license_plate_number: true,
        brand: true,
        model: true,
        daily_cost: true
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} car`;
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    return `This action updates a #${id} car`;
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
