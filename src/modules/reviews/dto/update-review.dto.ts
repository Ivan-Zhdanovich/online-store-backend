import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class UpdateReviewDTO {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsNotEmpty()
  @IsString()
  comment: string;
}
