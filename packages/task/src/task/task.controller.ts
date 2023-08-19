import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { AuthGuard } from '../common/auth.guard';
import { TaskAgregateService } from './task.agregate';
import { User } from '../common/user.decorator';
import { Task } from '../model';
import { CreateTaskDto } from './task.dto';
import { DepricateInterceptor } from '../common/deprication.interceptor';

@UseGuards(AuthGuard)
@UseInterceptors(new DepricateInterceptor())
@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly taskAgregateService: TaskAgregateService,
  ) {}

  @Get()
  tasks(@User() user: any): Promise<Task[]> {
    return this.taskService.getTasks({ ...user });
  }

  @Post()
  addTask(@Body() body: CreateTaskDto) {
    return this.taskAgregateService.creteTask(body);
  }

  @Patch()
  reasignTasks() {
    this.taskAgregateService.reassignTasks();
  }

  @Put()
  taskComplited(@Body() body: { taskId: string }) {
    return this.taskAgregateService.taskComplited(body.taskId);
  }
}
