import { Injectable, Inject } from '@nestjs/common';
import { Article } from '../domain/entities/article.entity';
import type { ArticleRepository } from '../domain/ports/article.repository';
import type { Scraper } from '../domain/ports/scraper';

@Injectable()
export class ScrapingService {
  constructor(
    @Inject('ArticleRepository')
    private readonly articleRepository: ArticleRepository,
    @Inject('Scraper')
    private readonly scraper: Scraper,
  ) {}

  async scrapeArticles(): Promise<{ saved: number; failed: number }> {
    const articles = await this.scraper.scrapeArticles();

    const saved = await this.articleRepository.saveMany(articles);

    return {
      saved,
      failed: articles.length - saved,
    };
  }

  async getArticlesFromLastDays(days: number = 7): Promise<Article[]> {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    return this.articleRepository.findByDateRange(startDate, endDate);
  }

  async getAllArticles(): Promise<Article[]> {
    return this.articleRepository.findAll();
  }
}
