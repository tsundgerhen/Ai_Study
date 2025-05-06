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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameController = void 0;
const common_1 = require("@nestjs/common");
const game_start_dto_1 = require("./dto/game-start.dto");
const game_destroy_dto_1 = require("./dto/game-destroy.dto");
const game_service_1 = require("./game.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const common_2 = require("@nestjs/common");
let GameController = class GameController {
    gameService;
    constructor(gameService) {
        this.gameService = gameService;
    }
    signup(dto) {
        return this.gameService.start(dto);
    }
    login(dto) {
        return this.gameService.destroy(dto);
    }
};
exports.GameController = GameController;
__decorate([
    (0, common_1.Post)('start'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [game_start_dto_1.GameStartDto]),
    __metadata("design:returntype", void 0)
], GameController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('destroy'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [game_destroy_dto_1.GameDestroyDto]),
    __metadata("design:returntype", void 0)
], GameController.prototype, "login", null);
exports.GameController = GameController = __decorate([
    (0, common_1.Controller)('game'),
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [game_service_1.GameService])
], GameController);
//# sourceMappingURL=game.controller.js.map