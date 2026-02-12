import { Injectable } from '@nestjs/common';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoList } from './entities/todo-list.entity';

@Injectable()
export class TodoListService {
  constructor(
    @InjectRepository(TodoList)
    private readonly repo: Repository<TodoList>,
  ) {}

  async create(createTodoListDto: CreateTodoListDto) {
    const todoList = this.repo.create(createTodoListDto);
    if (!todoList) {
      throw new Error('todo list not created');
    }
    return this.repo.save(todoList);
  }

  findAll() {
    return `This action returns all todoList`;
  }

  findOne(id: number) {
    return `This action returns a #${id} todoList`;
  }

  async update(id: number, updateTodoListDto: UpdateTodoListDto) {
    const todoListUpdate = await this.repo.findOneBy({ id });

    if (!todoListUpdate) {
      throw new Error('Todo list not found');
    }

    Object.assign(todoListUpdate, updateTodoListDto);

    return this.repo.save(todoListUpdate);
  }

  remove(id: number) {
    return `This action removes a #${id} todoList`;
  }
}
