import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeResolver } from './employee.resolver';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.entity';

const mockService = () => ({
  getEmployees: jest.fn(),
  getEmployeeById: jest.fn(),
  createEmployee: jest.fn(),
  updateEmployee: jest.fn(),
  deleteEmployee: jest.fn(),
});

describe('EmployeeResolver', () => {
  let resolver: EmployeeResolver;
  let employeeService: EmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeResolver,
        {
          provide: EmployeeService,
          useFactory: mockService,
        },
      ],
    }).compile();

    resolver = module.get<EmployeeResolver>(EmployeeResolver);
    employeeService = module.get<EmployeeService>(EmployeeService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('employees', () => {
    it('should return a list of employees', async () => {
      const testEmployee: Partial<Employee> = {
        name: 'Joe',
        id: 1,
      };

      jest
        .spyOn(employeeService, 'getEmployees')
        //@ts-ignore
        .mockResolvedValue([testEmployee]);

      const employees = await resolver.employees();
      expect(employees).toEqual([testEmployee]);
    });
  });

  describe('employee', () => {
    it('should return a single employee based on their id', async () => {
      const testEmployee: Partial<Employee> = {
        name: 'Joe',
        id: 1,
      };

      jest
        .spyOn(employeeService, 'getEmployeeById')
        //@ts-ignore
        .mockResolvedValue(testEmployee);

      const employee = await resolver.employee(1);
      expect(employee).toEqual(testEmployee);
    });
  });

  describe('create', () => {
    it('should create an employee and return them', async () => {
      const newEmployee = { name: 'Sarah' };

      jest
        .spyOn(employeeService, 'createEmployee')
        //@ts-ignore
        .mockResolvedValue({ ...newEmployee, id: 1 });
      const result = await resolver.create(newEmployee);
      expect(result).toEqual({ name: 'Sarah', id: 1 });
    });
  });

  describe('update', () => {
    it('should update an employee and return them', async () => {
      const updatedEmployee = { name: 'John', id: 3 };

      jest
        .spyOn(employeeService, 'updateEmployee')
        //@ts-ignore
        .mockResolvedValue({ name: 'Chris', id: 3 });
      const result = await resolver.update(updatedEmployee);
      expect(result).toEqual({ name: 'Chris', id: 3 });
    });
  });

  describe('delete', () => {
    it('should delete an employee', async () => {
      const deleteEmployee = { id: 3 };

      jest
        .spyOn(employeeService, 'deleteEmployee')
        //@ts-ignore
        .mockResolvedValue({ deleted: true });
      const result = await resolver.delete(deleteEmployee);
      expect(result).toEqual({ deleted: true });
    });
  });
});
