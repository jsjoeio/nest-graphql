import { Resolver } from '@nestjs/graphql';
import { Query } from '@nestjs/graphql';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.model';

@Resolver(of => Employee)
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Query(returns => [Employee])
  employees(): Employee[] {
    return this.employeeService.getEmployees();
  }
}
