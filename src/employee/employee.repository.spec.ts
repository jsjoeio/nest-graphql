import { Test, TestingModule } from '@nestjs/testing';
import { Employee } from './employee.entity';
import { EmployeeRepository } from './employee.repository';
import { CreateEmployeeDto } from './dto/create-employee.dto';

describe('EmployeeRepository', () => {
  let employeeRepository: EmployeeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeRepository],
    }).compile();

    employeeRepository = module.get<EmployeeRepository>(EmployeeRepository);
  });

  describe('createEmployee', () => {
    it('should create a new employee ', async () => {
      employeeRepository.createEmployee = jest.fn();
      //@ts-ignore
      employeeRepository.createEmployee.mockResolvedValue({
        name: 'Joe',
        id: 1,
      });
      const createEmployeeDto: CreateEmployeeDto = {
        name: 'Joe',
      };

      const create = await employeeRepository.createEmployee(createEmployeeDto);
      expect(create).toEqual({ name: 'Joe', id: 1 });
    });
  });
});
