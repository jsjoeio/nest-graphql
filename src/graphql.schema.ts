
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export interface CreateEmployeeInput {
    name: string;
}

export interface Employee {
    id?: number;
    name?: string;
}

export interface IMutation {
    createEmployee(createEmployeeInput?: CreateEmployeeInput): Employee | Promise<Employee>;
}

export interface IQuery {
    employees(): Employee[] | Promise<Employee[]>;
    employee(id: string): Employee | Promise<Employee>;
}
