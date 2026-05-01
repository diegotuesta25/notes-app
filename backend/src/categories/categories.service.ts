import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
  }

  findOrCreate(name: string) {
    return this.prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  delete(id: number) {
    return this.prisma.category.delete({ where: { id } });
  }
}
