import { Test, TestingModule } from '@nestjs/testing';
import { PlaygroundController } from './playground.controller';

describe('Playground Controller', () => {
  let controller: PlaygroundController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaygroundController],
    }).compile();

    controller = module.get<PlaygroundController>(PlaygroundController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
