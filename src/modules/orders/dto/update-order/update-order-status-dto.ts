import { IsNotEmpty } from 'class-validator';
import { Status } from 'src/enums/status.enum';

export class UpdateOrderStatusDTO {
  @IsNotEmpty()
  status: Status;
}
