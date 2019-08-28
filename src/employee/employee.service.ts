import { Injectable } from '@nestjs/common';
import { Employee } from './employee.model';

@Injectable()
export class EmployeeService {
  private readonly employees: Employee[] = [
    {
      id: '1',
      name: 'Joe',
    },
    {
      id: '2',
      name: 'Chris',
    },
  ];

  getEmployees(): Employee[] {
    return this.employees;
  }
}
