import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { ToggleArchiveDto, UpdateNoteDto } from './dto/update-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Get('active')
  findActive(
    @Query('categoryId', new ParseIntPipe({ optional: true }))
    categoryId?: number,
  ) {
    return this.notesService.findActive(categoryId);
  }

  @Get('archived')
  findArchived(
    @Query('categoryId', new ParseIntPipe({ optional: true }))
    categoryId?: number,
  ) {
    return this.notesService.findArchived(categoryId);
  }

  @Post()
  create(@Body() body: CreateNoteDto) {
    return this.notesService.create(body);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateNoteDto) {
    return this.notesService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.notesService.delete(id);
  }

  @Put(':id/archive')
  toggleArchive(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ToggleArchiveDto,
  ) {
    return this.notesService.toggleArchive(id, body.archived);
  }

  @Post(':id/category/:categoryId')
  addCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.notesService.addCategory(id, categoryId);
  }

  @Delete(':id/category/:categoryId')
  removeCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.notesService.removeCategory(id, categoryId);
  }
}
