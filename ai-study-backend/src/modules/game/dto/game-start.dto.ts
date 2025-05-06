import { IsEmail, IsNotEmpty } from 'class-validator';

export class GameStartDto {
    @IsNotEmpty()
    enemyCount: number;
    
}