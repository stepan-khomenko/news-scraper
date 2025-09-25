# News Scraper API

Une application de web scraping développée avec NestJS qui collecte et stocke des articles de presse depuis des sites d'actualités dans une base de données MySQL.

## Architecture

Le projet suit l'architecture hexagonale.

Structure des dossiers :
- `src/core/domain/` - Entités et interfaces
- `src/core/application/` - Services et orchestration
- `src/infrastructure/adapters/` - Base de données et scrapers
- `src/infrastructure/controllers/` - API REST

## Technologies

- **NestJS**
- **MySQL 8.0**
- **Sequelize**
- **Docker**
- **Node.js 22**

## Prérequis

- Docker et Docker Compose
- Git

## Installation et démarrage

1. Cloner le repository
```bash
git clone https://github.com/stepan-khomenko/news-scraper.git
cd news-scraper
```

2. Copier le fichier d'environnement
```bash
cp .env.example .env
```

3. Démarrer les services avec Docker
```bash
docker-compose up -d
```

L'application sera accessible sur http://localhost:3000

## API Endpoints

### POST /scrape
Lance le scraping des articles depuis le site configuré (SCRAPER_URL) et les sauvegarde en base de données.

**Réponse :**
```json
{
  "message": "Scraping terminé",
  "saved": 30,
  "failed": 0
}
```

### GET /articles
Récupère les articles stockés en base de données.

**Paramètres :**
- `days` (optionnel) : Filtre par date de publication (nombre de jours dans le passé)

**Exemples :**
```bash
# Tous les articles
curl http://localhost:3000/articles

# Articles publiés dans les 2 derniers jours
curl http://localhost:3000/articles?days=2
```

## Base de données

La table `articles` est créée automatiquement au démarrage avec :
- Index sur `publication_date` pour optimiser les requêtes par date
- Index unique sur `url` pour éviter les doublons
- Utilisation de `bulkCreate` avec `ignoreDuplicates` pour les insertions en masse

## Tests

Pour tester l'application :

```bash
# Lancer le scraping
curl -X POST http://localhost:3000/scrape

# Récupérer les articles
curl http://localhost:3000/articles
```