import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ArticleModel } from './article.model';
import { SequelizeArticleRepository } from './sequelize-article-repository';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'mysql',
      port: 3306,
      username: process.env.DB_USER || 'scraper_user',
      password: process.env.DB_PASSWORD || 'scraper_pass',
      database: process.env.DB_NAME || 'news_scraper',
      models: [ArticleModel],
      synchronize: false,
    }),
    SequelizeModule.forFeature([ArticleModel]),
  ],
  providers: [SequelizeArticleRepository],
  exports: [SequelizeArticleRepository],
})
export class DatabaseModule {}
