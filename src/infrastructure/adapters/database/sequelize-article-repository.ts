import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Article } from '../../../core/domain/entities/article.entity';
import { ArticleRepository } from '../../../core/domain/ports/article.repository';
import { ArticleModel } from './article.model';

@Injectable()
export class SequelizeArticleRepository implements ArticleRepository {
  constructor(
    @InjectModel(ArticleModel)
    private readonly articleModel: typeof ArticleModel,
  ) {}

  async save(article: Article): Promise<void> {
    await this.articleModel.create({
      title: article.title,
      url: article.url,
      publication_date: article.publication_date,
      source: article.source,
    });
  }

  async saveMany(articles: Article[]): Promise<number> {
    const data = articles.map((article) => ({
      title: article.title,
      url: article.url,
      publication_date: article.publication_date,
      source: article.source,
    }));

    const countBefore = await this.articleModel.count();

    await this.articleModel.bulkCreate(data, {
      ignoreDuplicates: true,
    });

    const countAfter = await this.articleModel.count();

    // Retourner le nombre d'articles insérés
    return countAfter - countBefore;
  }

  async findAll(): Promise<Article[]> {
    const models = await this.articleModel.findAll();
    return models.map((model) => this.modelToEntity(model));
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Article[]> {
    const models = await this.articleModel.findAll({
      where: {
        publication_date: {
          [Op.between]: [startDate, endDate],
        },
      },
      order: [['publication_date', 'DESC']],
    });

    return models.map((model) => this.modelToEntity(model));
  }

  async findBySource(source: string): Promise<Article[]> {
    const models = await this.articleModel.findAll({
      where: { source },
    });

    return models.map((model) => this.modelToEntity(model));
  }

  private modelToEntity(model: ArticleModel): Article {
    return new Article({
      title: model.get('title'),
      url: model.get('url'),
      source: model.get('source'),
      publication_date: model.get('publication_date'),
    });
  }
}
