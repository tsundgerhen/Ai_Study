// src/modules/game/tts.service.ts

import { Injectable, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class TtsService {
  private readonly CHIMEGE_URL = 'https://api.chimege.com/v1.2/synthesize';
  private readonly CHIMEGE_TOKEN: string;

  constructor(private readonly configService: ConfigService) {
    this.CHIMEGE_TOKEN = this.configService.get<string>('CHIMEGE_API_KEY') || '';
    if (!this.CHIMEGE_TOKEN) {
      throw new Error('CHIMEGE_API_KEY is not set in environment variables.');
    }
  }

  async synthesize(text: string): Promise<Buffer> {
    try {
      const response = await axios.post(this.CHIMEGE_URL, text, {
        headers: {
          'Content-Type': 'plain/text',
          Token: this.CHIMEGE_TOKEN,
        },
        responseType: 'arraybuffer',
      });

      return Buffer.from(response.data);
    } catch (error) {
      console.error('TTS error:', error?.response?.data || error.message);
      throw new HttpException('Failed to synthesize speech', 500);
    }
  }
}