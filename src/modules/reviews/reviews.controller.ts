import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDTO } from './dto/create-review.dto';
import { UpdateReviewDTO } from './dto/update-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post(':productId')
  addReview(
    @Request() req,
    @Param('productId', ParseIntPipe) productId: number,
    @Body() createReviewDto: CreateReviewDTO,
  ) {
    const userId: number = req.user.id;
    return this.reviewsService.addReview(userId, productId, createReviewDto);
  }

  @Patch('reviewId')
  updateReview(
    @Request() req,
    @Param('reviewId', ParseIntPipe) reviewId: number,
    @Body() updateReviewDto: UpdateReviewDTO,
  ) {
    const userId: number = req.user.id;
    return this.reviewsService.updateReview(userId, reviewId, updateReviewDto);
  }

  @Delete('reviewId')
  deleteReview(
    @Request() req,
    @Param('reviewId', ParseIntPipe) reviewId: number,
  ) {
    const userId: number = req.user.id;
    return this.reviewsService.deleteReview(userId, reviewId);
  }

  @Get('product/:productId')
  getProductReviews(@Param('productId', ParseIntPipe) productId: number) {
    return this.reviewsService.getProductReviews(productId);
  }
}
