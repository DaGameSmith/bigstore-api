import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main(){
    await prisma.user.deleteMany();
    // const abraham = await prisma.user.create({
    //     data: {
    //         email: 'abrahamolutunmida@gmail.com',
    //         username: 'gamesmith',
    //     }
    // });

    // console.log({abraham});
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    })