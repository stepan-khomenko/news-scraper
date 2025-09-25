import {
  Column,
  Model,
  Table,
  DataType,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'articles',
  timestamps: true,
})
export class ArticleModel extends Model {
  @Column({
    type: DataType.STRING(500),
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING(1000),
    allowNull: false,
    unique: true,
  })
  url: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  publication_date: Date;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  source: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
