import { GameStartDto } from './dto/game-start.dto';
import { GameDestroyDto } from './dto/game-destroy.dto';
import { AIResDto } from './dto/ai-res.dto';
import { AiService } from './ai.service';
export declare class GameService {
    private readonly aiService;
    private enemyCount;
    constructor(aiService: AiService);
    private readonly gameStartPrompt;
    private readonly gameDestroyPrompt;
    private readonly gameWinPrompt;
    start(dto: GameStartDto): Promise<AIResDto>;
    destroy(dto: GameDestroyDto): Promise<AIResDto>;
    private formatPrompt;
}
