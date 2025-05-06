import { IsEmail, IsNotEmpty } from 'class-validator';

export class AIResDto {
    @IsNotEmpty()
    res: string;

    // audio: Buffer;
       
}