import { Article } from '../entities/article.entity';

export interface ArticleRepository {
  save(article: Article): Promise<void>;
  saveMany(articles: Article[]): Promise<number>;
  findAll(): Promise<Article[]>;
  findByDateRange(startDate: Date, endDate: Date): Promise<Article[]>;
  findBySource(source: string): Promise<Article[]>;
}
