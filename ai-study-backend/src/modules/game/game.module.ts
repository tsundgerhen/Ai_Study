import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { AiService } from './ai.service';
import { TtsService } from './tts.service';
@Module({
  imports: [],
  controllers: [GameController],
  providers: [GameService, AiService, TtsService],
})
export class GameModule {}