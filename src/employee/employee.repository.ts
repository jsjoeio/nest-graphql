import { Repository, EntityRepository } from 'typeorm';
import { Employee } from './employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';

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
}
