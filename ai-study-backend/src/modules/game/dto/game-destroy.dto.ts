import { IsEmail, IsNotEmpty } from 'class-validator';

export class GameDestroyDto {
    @IsNotEmpty()
    enemyCount: number;   
}