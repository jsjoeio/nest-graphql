import { Injectable } from '@nestjs/common';
import { Employee } from './employee.entity';
import { EmployeeRepository } from './employee.repository';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async getEmployees(): Promise<Employee[]> {
    return await this.employeeRepository.find();
  }

  async createEmployee(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    const { name } = createEmployeeDto;
    const employee = new Employee({ name });
    await employee.save();

    return employee;
  }
}
