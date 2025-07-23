import { Status } from 'src/enums/status.enum';

export class OrderDTO {
  id: number;
  status: Status;
  total: number;
  createdAt: Date;
}
