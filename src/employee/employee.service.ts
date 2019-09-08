import { Injectable, NotFoundException } from '@nestjs/common';
import { Employee } from './employee.entity';
import { EmployeeRepository } from './employee.repository';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { DeleteEmployeeDto } from './dto/delete-employee.dto';
import { DeleteEmployeePayloadDto } from './dto/delete-employee-payload.dto';
@Injectable()
export class EmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async getEmployees(): Promise<Employee[]> {
    return await this.employeeRepository.find();
  }

  async getEmployeeById(id: number): Promise<Employee> {
    return await this.employeeRepository.findOne(id);
  }

  async createEmployee(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    return await this.employeeRepository.createEmployee(createEmployeeDto);
  }

  async deleteEmployee(
    deleteEmployeeDto: DeleteEmployeeDto,
  ): Promise<DeleteEmployeePayloadDto> {
    const { id } = deleteEmployeeDto;
    const result = await this.employeeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Employee with ID: ${id} not found.`);
    }

    return { deleted: true };
  }
}
