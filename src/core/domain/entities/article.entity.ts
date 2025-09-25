export class Article {
  id?: number;
  title: string;
  url: string;
  publication_date?: Date;
  source: string;
  created_at?: Date;
  updated_at?: Date;

  constructor(data: {
    title: string;
    url: string;
    source: string;
    publication_date?: Date;
  }) {
    this.title = data.title;
    this.url = data.url;
    this.source = data.source;
    this.publication_date = data.publication_date;
  }
}
