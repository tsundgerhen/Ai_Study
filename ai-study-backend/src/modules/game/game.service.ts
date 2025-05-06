import { Injectable } from '@nestjs/common';
import { GameStartDto } from './dto/game-start.dto';
import { GameDestroyDto } from './dto/game-destroy.dto';
import { AIResDto } from './dto/ai-res.dto';
import { AiService } from './ai.service';
import { TtsService } from './tts.service';

@Injectable()
export class GameService {
  private enemyCount = 0;

  constructor(
    private readonly aiService: AiService,
    private readonly ttsService: TtsService,
  ) {}

  private readonly gameStartPrompt =
    "You're talking to a 6-year-old playing a space game. They're a brave pilot with {enemyCount} enemy starships to shoot down. Each time they destroy one, they subtract 1 from the total. For example, {enemyCount} minus 1 is {enemyCountMinusOne}. Say something fun and simple to get them excited to start shooting and learn subtraction. Keep it 1-2 short sentences! give me response in mongolian language";

  private readonly gameDestroyPrompt =
    "You're talking to a 6-year-old playing a space game. They just destroyed an enemy starship! There were {previousCount} starships, and now there are {currentCount} because they subtracted 1. Say something exciting and simple about how cool subtraction is, cheer them on, and remind them there are still more starships to destroy. Make sure not to say the game is finished yet! Keep it 1-2 short sentences for a kid! give me response in mongolian language";

  private readonly gameWinPrompt =
    "You're talking to a 6-year-old who just won a space game by destroying all enemy starships! They started with {initialCount} starships and subtracted them all to reach 0. Say something super exciting and simple about how they used subtraction to win, and cheer them to play again. Keep it 1-2 short sentences for a kid! give me response in mongolian language";

  async start(dto: GameStartDto): Promise<AIResDto> {
    this.enemyCount = dto.enemyCount;

    const text = this.formatPrompt(this.gameStartPrompt, {
      enemyCount: dto.enemyCount,
      enemyCountMinusOne: dto.enemyCount - 1,
    });

    const res = await this.aiService.askGemini(text);
    //const audio = await this.ttsService.synthesize(res);

    return { res }; // Add audio to response
  }

  async destroy(dto: GameDestroyDto): Promise<AIResDto> {
    let prompt: string;
    let values: Record<string, any>;

    if (dto.enemyCount <= 0) {
      prompt = this.gameWinPrompt;
      values = { initialCount: this.enemyCount };
    } else {
      prompt = this.gameDestroyPrompt;
      values = {
        previousCount: dto.enemyCount + 1,
        currentCount: dto.enemyCount,
      };
    }

    const text = this.formatPrompt(prompt, values);
    const res = await this.aiService.askGemini(text);
    //const audio = await this.ttsService.synthesize(res);

    return { res }; // Add audio to response
  }

  private formatPrompt(template: string, values: Record<string, any>): string {
    let formatted = template;
    for (const [key, value] of Object.entries(values)) {
      formatted = formatted.replaceAll(`{${key}}`, String(value));
    }
    return formatted;
  }
}