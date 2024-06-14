import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async findOne(id: number): Promise<Todo> {
    return this.todoRepository.findOne({ where: { id } });
  }

  async create(todo: Partial<Todo>): Promise<Todo> {
    const newTodo = this.todoRepository.create(todo);
    console.log(newTodo);
    return this.todoRepository.save(newTodo);
  }

  async update(id: number, todo: Partial<Todo>): Promise<Todo> {
    await this.todoRepository.update(id, todo);
    return this.todoRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
