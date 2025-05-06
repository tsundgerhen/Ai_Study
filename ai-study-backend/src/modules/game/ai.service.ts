import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class AiService {
  private gemini: GoogleGenerativeAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (!apiKey) throw new Error('GEMINI_API_KEY is not set');
    this.gemini = new GoogleGenerativeAI(apiKey);
  }

  async askGemini(prompt: string): Promise<string> {
    const model = this.gemini.getGenerativeModel({ model: 'gemini-1.5-flash' });

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      return text || 'No response from Gemini.';
    } catch (error) {
      console.error('Gemini API error:', error);
      return 'Error calling Gemini API.';
    }
  }
}


// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { OpenAI } from 'openai'; // Import the OpenAI package

// @Injectable()
// export class AiService {
//   private openAI: OpenAI;

//   constructor(private configService: ConfigService) {
//     const apiKey = this.configService.get<string>('OPENAI_API_KEY');
//     if (!apiKey) throw new Error('OPENAI_API_KEY is not set');
    
//     // Initialize OpenAI client
//     this.openAI = new OpenAI({
//       apiKey: apiKey,
//     });
//   }

//   async askOpenAI(prompt: string): Promise<string> {
//     try {
//       const response = await this.openAI.chat.completions.create({
//         model: 'gpt-3.5', // Or 'gpt-4' depending on your API access
//         messages: [{ role: 'user', content: prompt }],
//       });

//       return response.choices[0].message.content || 'No response from OpenAI.';
//     } catch (error) {
//       console.error('OpenAI API error:', error?.response?.data || error.message);
//       return 'Error calling OpenAI API.';
//     }
//   }
// }