import { IsNotEmpty, IsPositive } from "class-validator";


export class CreateCarDto {
    @IsNotEmpty()
    license_plate_number: string;

    @IsNotEmpty()
    brand: string;
    
    @IsNotEmpty()
    model: string;

    @IsNotEmpty()
    @IsPositive()
    daily_cost: number;

    
}
