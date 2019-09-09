import { Controller, Get, Header } from '@nestjs/common';
import * as fs from 'fs';

@Controller('playground')
export class PlaygroundController {
  @Get()
  @Header('Content-Type', 'text/html')
  getPage() {
    return fs.readFileSync('./src/playground/playground.html', 'utf-8');
  }
}
