import { Repository, EntityRepository } from 'typeorm';
import { Employee } from './employee.entity';

@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee> {}
