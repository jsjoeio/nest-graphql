import { Repository, EntityRepository } from 'typeorm';
import { Employee } from './employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee> {
  async createEmployee(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    const { name } = createEmployeeDto;
    const employee = new Employee({ name });
    await employee.save();

    return employee;
  }

  async updateEmployee(
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    const { name, id } = updateEmployeeDto;
    const employee = await this.findOne(id);
    employee.name = name;
    await employee.save();

    return employee;
  }
}
