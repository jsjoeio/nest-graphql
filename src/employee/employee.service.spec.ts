import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from './employee.service';
import { EmployeeRepository } from './employee.repository';
import { Employee } from './employee.entity';
import { NotFoundException } from '@nestjs/common';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { DeleteEmployeeDto } from './dto/delete-employee.dto';

const mockRepository = () => ({
  createEmployee: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
});

describe('EmployeeService', () => {
  let employeeService: EmployeeService;
  let employeeRepository: EmployeeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        {
          provide: EmployeeRepository,
          useFactory: mockRepository,
        },
      ],
    }).compile();

    employeeService = module.get<EmployeeService>(EmployeeService);
    employeeRepository = await module.get<EmployeeRepository>(
      EmployeeRepository,
    );
  });

  describe('getEmployees', () => {
    it('should get all employees from the repository', async () => {
      const testEmployee: Partial<Employee> = {
        name: 'Joe',
        id: 1,
      };
      // TS doesn't think .mockResolvedValue returns a Promise
      // so ignoring for now.
      //@ts-ignore
      jest.spyOn(employeeRepository, 'find').mockResolvedValue([testEmployee]);
      expect(employeeRepository.find).not.toHaveBeenCalled;
      const employees = await employeeService.getEmployees();
      expect(employees).toHaveLength(1);
      expect(employees[0]).toBe(testEmployee);
    });
  });

  describe('getEmployeeById', () => {
    it('should return the employee if they exist', async () => {
      const testEmployee: Partial<Employee> = {
        name: 'Joe',
        id: 1,
      };
      //@ts-ignore
      jest.spyOn(employeeRepository, 'findOne').mockResolvedValue(testEmployee);
      expect(employeeRepository.find).not.toHaveBeenCalled;
      const employee = await employeeService.getEmployeeById(1);
      expect(employee).toBe(testEmployee);
    });

    it('should throw an error if employee not found', async () => {
      jest.spyOn(employeeRepository, 'findOne').mockResolvedValue(null);
      expect(employeeService.getEmployeeById(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createEmployee', () => {
    it('should create an employee and return them', async () => {
      // skip
      const testEmployee: Partial<Employee> = {
        name: 'Joe',
        id: 1,
      };

      jest
        .spyOn(employeeRepository, 'createEmployee')
        //@ts-ignore
        .mockResolvedValue(testEmployee);
      expect(await employeeService.createEmployee({ name: 'Joe' })).toBe(
        testEmployee,
      );
    });
  });

  describe('updateEmployee', () => {
    it('should update an employee and return them', async () => {
      const updatedEmployee = {
        name: 'Sarah',
        id: 3,
        save: jest.fn(),
      };

      jest
        .spyOn(employeeRepository, 'findOne')
        //@ts-ignore
        .mockResolvedValue(updatedEmployee);

      expect(
        await employeeService.updateEmployee({ id: 3, name: 'Deen' }),
      ).toBe(updatedEmployee);
    });

    it('should throw an error if employee is not found', async () => {
      const updateEmployeeDto: UpdateEmployeeDto = {
        id: 3,
        name: 'Deen',
      };

      expect(employeeService.updateEmployee(updateEmployeeDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteEmployee', () => {
    it('should return {deleted: true} if employee exists', async () => {
      const mockedValue = {
        deleted: true,
      };

      jest
        .spyOn(employeeRepository, 'delete')
        //@ts-ignore
        .mockResolvedValue(mockedValue);
      const result = await employeeService.deleteEmployee({ id: 1 });
      expect(result).toEqual(mockedValue);
    });
    it('should throw an error if employee does not exist', () => {
      const deleteEmployeeDto: DeleteEmployeeDto = {
        id: 2,
      };
      jest
        .spyOn(employeeRepository, 'delete')
        // @ts-ignore
        .mockResolvedValue({ affected: 0 });
      expect(employeeService.deleteEmployee(deleteEmployeeDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
  it('should be defined', () => {
    expect(employeeService).toBeDefined();
  });
});
