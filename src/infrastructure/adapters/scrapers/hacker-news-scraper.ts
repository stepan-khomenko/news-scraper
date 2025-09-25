import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { Article } from '../../../core/domain/entities/article.entity';
import { ScrapingException } from '../../../core/domain/exceptions/scraping.exception';
import { Scraper } from '../../../core/domain/ports/scraper';

@Injectable()
export class HackerNewsScraper implements Scraper {
  private readonly url =
    process.env.SCRAPER_URL || 'https://news.ycombinator.com';
  private readonly source = 'Hacker News';

  async scrapeArticles(): Promise<Article[]> {
    try {
      const response = await axios.get<string>(this.url);
      const $ = cheerio.load(response.data);
      const articles: Article[] = [];

      $('.athing').each((_index, element) => {
        const $element = $(element);
        const $titleLine = $element.find('.titleline');
        const $link = $titleLine.find('a').first();

        const title = $link.text();
        let url = $link.attr('href');

        if (!title || !url) {
          return;
        }

        // Normaliser les URLs internes de Hacker News
        if (!url.startsWith('http')) {
          url = `https://news.ycombinator.com/${url}`;
        }

        // Récupérer la ligne suivante qui contient les métadonnées
        const $subtext = $element.next();
        const age = $subtext.find('.age').attr('title');

        const article = new Article({
          title: title.trim(),
          url: url,
          source: this.source,
          publication_date: this.parseTimestamp(age),
        });

        articles.push(article);
      });

      return articles;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);

      throw new ScrapingException(`Échec du scraping: ${message}`);
    }
  }

  private parseTimestamp(age: string | undefined): Date {
    if (!age) {
      return new Date();
    }

    // Format: "2025-09-23T15:33:23 1758641603"
    const date = age.split(' ')[0];

    try {
      return new Date(date);
    } catch {
      return new Date();
    }
  }
}
