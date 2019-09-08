import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { DeleteEmployeeDto } from './dto/delete-employee.dto';
import { DeleteEmployeePayloadDto } from './dto/delete-employee-payload.dto';

@Resolver(of => Employee)
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Query(returns => [Employee])
  async employees(): Promise<Employee[]> {
    return this.employeeService.getEmployees();
  }

  @Query(returns => Employee)
  async employee(id: number): Promise<Employee> {
    return this.employeeService.getEmployeeById(id);
  }

  @Mutation('createEmployee')
  async create(
    @Args('createEmployeeInput')
    args: CreateEmployeeDto,
  ): Promise<Employee> {
    return this.employeeService.createEmployee(args);
  }

  @Mutation('deleteEmployee')
  async delete(
    @Args('deleteEmployeeInput')
    args: DeleteEmployeeDto,
  ): Promise<DeleteEmployeePayloadDto> {
    return await this.employeeService.deleteEmployee(args);
  }
}
