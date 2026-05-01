import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  findActive(categoryId?: number) {
    return this.prisma.note.findMany({
      where: {
        archived: false,
        ...(categoryId && { categories: { some: { id: categoryId } } }),
      },
      include: { categories: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  findArchived(categoryId?: number) {
    return this.prisma.note.findMany({
      where: {
        archived: true,
        ...(categoryId && { categories: { some: { id: categoryId } } }),
      },
      include: { categories: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  create(data: { title: string; content: string }) {
    return this.prisma.note.create({ data, include: { categories: true } });
  }

  update(id: number, data: { title?: string; content?: string }) {
    return this.prisma.note.update({
      where: { id },
      data,
      include: { categories: true },
    });
  }

  delete(id: number) {
    return this.prisma.note.delete({ where: { id } });
  }

  toggleArchive(id: number, archived: boolean) {
    return this.prisma.note.update({
      where: { id },
      data: { archived },
      include: { categories: true },
    });
  }

  addCategory(noteId: number, categoryId: number) {
    return this.prisma.note.update({
      where: { id: noteId },
      data: {
        categories: {
          connect: { id: categoryId },
        },
      },
      include: { categories: true },
    });
  }

  removeCategory(noteId: number, categoryId: number) {
    return this.prisma.note.update({
      where: { id: noteId },
      data: {
        categories: {
          disconnect: { id: categoryId },
        },
      },
      include: { categories: true },
    });
  }
}
