import { Article } from '../entities/article.entity';

export interface Scraper {
  scrapeArticles(): Promise<Article[]>;
}
