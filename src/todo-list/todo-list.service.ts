import { Injectable } from '@nestjs/common';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, Not } from 'typeorm';
import { TodoList } from './entities/todo-list.entity';

@Injectable()
export class TodoListService {
  constructor(
    @InjectRepository(TodoList)
    private readonly repo: Repository<TodoList>,
  ) {}

  async create(createTodoListDto: CreateTodoListDto, userId: string) {
    const todoList = this.repo.create({
      ...createTodoListDto,
      user: {
        id: userId,
      },
    });

    return this.repo.save(todoList);
  }

  findAll(userId: string) {
    return this.repo.find({
      where: {
        archivedAt: IsNull(),
        user: {
          id: userId,
        },
      },
    });
  }

  findArchived(userId: string) {
    return this.repo.find({
      where: {
        archivedAt: Not(IsNull()),
        user: {
          id: userId,
        },
      },
    });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
    });
  }

  async update(id: number, updateTodoListDto: UpdateTodoListDto) {
    const todoListUpdate = await this.repo.findOneBy({ id });

    if (!todoListUpdate) {
      throw new Error('Todo list not found');
    }

    Object.assign(todoListUpdate, updateTodoListDto);

    return this.repo.save(todoListUpdate);
  }

  async remove(id: number) {
    const todoList = await this.repo.findOneBy({ id });

    if (!todoList) {
      throw new Error('Todo list not found');
    }
    todoList.archivedAt = new Date();
    return this.repo.save(todoList);
  }
}
