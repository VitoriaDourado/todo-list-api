import { DataSource } from 'typeorm';
import { Task } from './src/tasks/task.entity';
import { TodoList } from './src/todo-list/entities/todo-list.entity';
import { User } from './src/users/user.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Task, TodoList, User],
  migrations: ['src/migrations/*.ts'],
});
