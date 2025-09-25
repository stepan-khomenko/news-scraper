import { Module } from '@nestjs/common';
import { ScrapingService } from './scraping.service';
import { HackerNewsScraper } from '../../infrastructure/adapters/scrapers/hacker-news-scraper';
import { DatabaseModule } from '../../infrastructure/adapters/database/database.module';
import { SequelizeArticleRepository } from '../../infrastructure/adapters/database/sequelize-article-repository';

@Module({
  imports: [DatabaseModule],
  providers: [
    ScrapingService,
    HackerNewsScraper,
    {
      provide: 'ArticleRepository',
      useExisting: SequelizeArticleRepository,
    },
    {
      provide: 'Scraper',
      useExisting: HackerNewsScraper,
    },
  ],
  exports: [ScrapingService],
})
export class ApplicationModule {}
