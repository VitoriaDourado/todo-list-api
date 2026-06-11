import { IsString, IsOptional, IsBoolean, IsDateString } from 'class-validator';

export class CreateTodoListDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
