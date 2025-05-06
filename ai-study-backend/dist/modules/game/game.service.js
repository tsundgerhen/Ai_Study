"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameService = void 0;
const common_1 = require("@nestjs/common");
const ai_service_1 = require("./ai.service");
let GameService = class GameService {
    aiService;
    enemyCount = 0;
    constructor(aiService) {
        this.aiService = aiService;
    }
    gameStartPrompt = "You're talking to a 6-year-old playing a space game. They're a brave pilot with {enemyCount} enemy starships to shoot down. Each time they destroy one, they subtract 1 from the total. For example, {enemyCount} minus 1 is {enemyCountMinusOne}. Say something fun and simple to get them excited to start shooting and learn subtraction. Keep it 1-2 short sentences! give me response in mongolia like native speaker";
    gameDestroyPrompt = "You're talking to a 6-year-old playing a space game. They just destroyed an enemy starship! There were {previousCount} starships, and now there are {currentCount} because they subtracted 1. Say something exciting and simple about how cool subtraction is, and cheer them on. Keep it 1-2 short sentences for a kid! give me response in mongolia like native speaker";
    gameWinPrompt = "You're talking to a 6-year-old who just won a space game by destroying all enemy starships! They started with {initialCount} starships and subtracted them all to reach 0. Say something super exciting and simple about how they used subtraction to win, and cheer them to play again. Keep it 1-2 short sentences for a kid! give me response in mongolia like native speaker";
    async start(dto) {
        this.enemyCount = dto.enemyCount;
        const text = this.formatPrompt(this.gameStartPrompt, {
            enemyCount: dto.enemyCount,
            enemyCountMinusOne: dto.enemyCount - 1,
        });
        const res = await this.aiService.askGemini(text);
        return { res };
    }
    async destroy(dto) {
        let prompt;
        let values;
        if (dto.enemyCount <= 0) {
            prompt = this.gameWinPrompt;
            values = { initialCount: this.enemyCount };
        }
        else {
            prompt = this.gameDestroyPrompt;
            values = {
                previousCount: dto.enemyCount + 1,
                currentCount: dto.enemyCount,
            };
        }
        const text = this.formatPrompt(prompt, values);
        const res = await this.aiService.askGemini(text);
        return { res };
    }
    formatPrompt(template, values) {
        let formatted = template;
        for (const [key, value] of Object.entries(values)) {
            formatted = formatted.replaceAll(`{${key}}`, String(value));
        }
        return formatted;
    }
};
exports.GameService = GameService;
exports.GameService = GameService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [ai_service_1.AiService])
], GameService);
//# sourceMappingURL=game.service.js.map