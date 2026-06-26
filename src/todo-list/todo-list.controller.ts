import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';

import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

import { TodoListService } from './todo-list.service';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';

interface AuthRequest extends Request {
  user: {
    id: string;
    email: string;
  };
}

@Controller('todo-list')
export class TodoListController {
  constructor(private readonly todoListService: TodoListService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() createTodoListDto: CreateTodoListDto,
    @Req() req: AuthRequest,
  ) {
    return this.todoListService.create(createTodoListDto, req.user.id);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@Req() req: AuthRequest) {
    return this.todoListService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoListService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateTodoListDto) {
    return this.todoListService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoListService.remove(+id);
  }
}
