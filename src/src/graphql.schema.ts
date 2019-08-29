
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export interface CreateEmployeeInput {
    name: string;
}

export interface DeleteEmployeeInput {
    id: number;
}

export interface DeleteEmployeePayload {
    deleted: boolean;
}

export interface Employee {
    id?: number;
    name?: string;
}

export interface IMutation {
    createEmployee(createEmployeeInput?: CreateEmployeeInput): Employee | Promise<Employee>;
    deleteEmployee(deleteEmployeeInput?: DeleteEmployeeInput): DeleteEmployeePayload | Promise<DeleteEmployeePayload>;
}

export interface IQuery {
    employees(): Employee[] | Promise<Employee[]>;
    employee(id: string): Employee | Promise<Employee>;
}
