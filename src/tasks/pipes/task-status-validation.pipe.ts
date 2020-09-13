import { BadGatewayException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../tasks-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {
  readonly alloweStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE
  ]

  transform(value: any) {
    value = value.toUpperCase()

    if (!this.isStatusValid(value)) {
      throw new BadGatewayException(`"${value}" is an invalid status`)
    }

    return value
  }

  private isStatusValid(status: any) {
    const idx = this.alloweStatuses.indexOf(status)
    return idx !== -1
  }
}