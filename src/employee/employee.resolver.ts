import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Resolver(of => Employee)
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Query(returns => [Employee])
  async employees(): Promise<Employee[]> {
    return this.employeeService.getEmployees();
  }

  @Mutation('createEmployee')
  async create(
    @Args('createEmployeeInput')
    args: CreateEmployeeDto,
  ): Promise<Employee> {
    return this.employeeService.createEmployee(args);
  }
}
