CREATE TABLE IF NOT EXISTS articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    url VARCHAR(1000) NOT NULL,
    publication_date DATETIME,
    source VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_publication_date (publication_date),
    INDEX idx_source (source),
    UNIQUE INDEX uq_url (url(255))
);

-- Requête optimisée pour récupérer les articles des 7 derniers jours
-- SELECT * FROM articles
-- WHERE publication_date >= DATE_SUB(NOW(), INTERVAL 7 DAY)
-- ORDER BY publication_date DESC;