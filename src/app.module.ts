import { Module } from '@nestjs/common';
import { ApplicationModule } from './core/application/application.module';
import { ScrapingController } from './infrastructure/controllers/scraping.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ApplicationModule],
  controllers: [AppController, ScrapingController],
  providers: [AppService],
})
export class AppModule {}
