import {
  Controller,
  Post,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ScrapingService } from '../../core/application/scraping.service';
import { ScrapingException } from '../../core/domain/exceptions/scraping.exception';
import { ParseOptionalPositiveIntPipe } from '../pipes/parse-optional-positive-int.pipe';

@Controller()
export class ScrapingController {
  constructor(private readonly scrapingService: ScrapingService) {}

  @Post('/scrape')
  async scrapeArticles() {
    try {
      const result = await this.scrapingService.scrapeArticles();

      return {
        message: 'Scraping terminé',
        saved: result.saved,
        failed: result.failed,
      };
    } catch (error) {
      if (error instanceof ScrapingException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }

      throw new HttpException(
        'Erreur interne',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/articles')
  async getArticles(
    @Query('days', ParseOptionalPositiveIntPipe) days?: number,
  ) {
    try {
      if (days) {
        return await this.scrapingService.getArticlesFromLastDays(days);
      }

      // Par défaut, retourne tous les articles
      return await this.scrapingService.getAllArticles();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Erreur lors de la récupération des articles',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
