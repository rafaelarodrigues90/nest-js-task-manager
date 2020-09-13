import { EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
    const { status, search } = filterDto
    const query = this.createQueryBuilder('task')

    if (status) {
      query.andWhere('task.status = :status', { status })
    }
    
    if (search) {
      query.andWhere(
        '(task.title ILIKE :search OR task.description ILIKE :search)', 
        { search: `%${search}%` }
      )
    }

    const tasks = await query.getMany()
    return tasks
  }
}

