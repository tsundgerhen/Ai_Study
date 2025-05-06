import { GameStartDto } from './dto/game-start.dto';
import { GameDestroyDto } from './dto/game-destroy.dto';
import { GameService } from './game.service';
export declare class GameController {
    private readonly gameService;
    constructor(gameService: GameService);
    signup(dto: GameStartDto): Promise<import("./dto/ai-res.dto").AIResDto>;
    login(dto: GameDestroyDto): Promise<import("./dto/ai-res.dto").AIResDto>;
}
