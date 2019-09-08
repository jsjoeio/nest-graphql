import { Injectable, NotFoundException } from '@nestjs/common';
import { Employee } from './employee.entity';
import { EmployeeRepository } from './employee.repository';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { DeleteEmployeeDto } from './dto/delete-employee.dto';
import { DeleteEmployeePayloadDto } from './dto/delete-employee-payload.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async getEmployees(): Promise<Employee[]> {
    return await this.employeeRepository.find();
  }

  async getEmployeeById(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOne(id);

    if (!employee) {
      throw new NotFoundException(`Employee with ID: ${id} not found.`);
    }
    return employee;
  }

  async createEmployee(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    return await this.employeeRepository.createEmployee(createEmployeeDto);
  }

  async updateEmployee(
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    const { name, id } = updateEmployeeDto;
    const employee = await this.employeeRepository.findOne(id);

    if (!employee) {
      throw new NotFoundException(`Employee with ID: ${id} not found.`);
    }

    employee.name = name;
    await employee.save();

    return employee;
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
