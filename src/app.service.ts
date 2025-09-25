import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getApiInfo() {
    return {
      name: 'News Scraper API',
      version: '1.0.0',
      endpoints: {
        'POST /scrape': 'Lance le scraping des articles',
        'GET /articles': 'Récupère tous les articles',
        'GET /articles?days=N': 'Récupère les articles des N derniers jours',
      },
      documentation: 'Voir README.md pour plus de détails',
    };
  }
}
