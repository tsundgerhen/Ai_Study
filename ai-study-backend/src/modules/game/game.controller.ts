import { Controller, Post, Body } from '@nestjs/common';
import { GameStartDto } from './dto/game-start.dto';
import { GameDestroyDto } from './dto/game-destroy.dto';
import { GameService } from './game.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('game')
@UseGuards(JwtAuthGuard)
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('start')
  signup(@Body() dto: GameStartDto) {
    return this.gameService.start(dto);
  }

  @Post('destroy')
  login(@Body() dto: GameDestroyDto) {
    return this.gameService.destroy(dto);
  }
}
