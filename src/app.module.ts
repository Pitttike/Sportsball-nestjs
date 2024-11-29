import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerModule } from './player/player.module';
import { TeamsModule } from './teams/teams.module';

@Module({
  imports: [PlayerModule, TeamsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
