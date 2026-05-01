import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateNoteDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;
}

export class ToggleArchiveDto {
  @IsBoolean()
  archived: boolean;
}
