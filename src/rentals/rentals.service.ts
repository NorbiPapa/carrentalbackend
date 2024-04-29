import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RentalsService {
  constructor(private readonly db: PrismaService){}
  async create(id: string) {
    const carExists = await this.db.cars.findUnique({
      where: { id: parseInt(id) },
    });

    if (!carExists) {
      throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
    }

    
    const existingRental = await this.db.rentals.findFirst({
      where: {
        car_id: parseInt(id),
        startDate: { lte: new Date() },
        endDate: { gte: new Date() },
      },
    });

    if (existingRental) {
      throw new HttpException(
        'Car already rented',
        HttpStatus.CONFLICT,
      );
    }

  
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);

    try {
      const createdRental = await this.db.rentals.create({
        data: {
          car_id: parseInt(id),
          startDate: new Date(),
          endDate: endDate,
        },
      });
      return createdRental;
    } catch (error) {
      throw new HttpException('Rental creation failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    };
  

  findAll() {
    return `This action returns all rentals`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rental`;
  }

  update(id: number, updateRentalDto: UpdateRentalDto) {
    return `This action updates a #${id} rental`;
  }

  remove(id: number) {
    return `This action removes a #${id} rental`;
  }
}
