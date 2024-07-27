import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
    return new PrismaClient()
}
declare global {
    var prismaGlobal: undifined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()
export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma