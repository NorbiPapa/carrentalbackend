import { faker } from "@faker-js/faker";
import { PrismaClient, cars, rentals } from "@prisma/client";
const prisma=new PrismaClient;

async function main() {
    
    for (let index = 0; index < 15; index++) {
        await prisma.rentals.create({
            data: {
                startDate: faker.date.anytime(),
                endDate: faker.date.recent(),
                car_id: faker.number.int({min:1, max:11})
            }
        })
        
    }
}