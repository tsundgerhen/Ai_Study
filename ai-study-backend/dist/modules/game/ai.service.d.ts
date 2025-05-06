import { ConfigService } from '@nestjs/config';
export declare class AiService {
    private configService;
    private gemini;
    constructor(configService: ConfigService);
    askGemini(prompt: string): Promise<string>;
}
