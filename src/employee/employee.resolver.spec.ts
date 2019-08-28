import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeResolver } from './employee.resolver';

describe('EmployeeResolver', () => {
  let resolver: EmployeeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeResolver],
    }).compile();

    resolver = module.get<EmployeeResolver>(EmployeeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
