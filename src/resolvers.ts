import { employees, addEmployee, updateEmployee, deleteEmployee, getAllEmployee } from './data';
import { Employee } from './types';

export const resolvers = {
  Query: {
    employees: () => employees,
    employee: (_: unknown, { id }: { id: string }): Employee | undefined => 
      employees.find(emp => emp.id === id),
  },
  Mutation: {
    addEmployee: (_: unknown, employee: Employee): Employee => addEmployee(employee),
    updateEmployee: (_: unknown, { id, ...employee }: { id: string, name?: string, position?: string, salary?: number }): Employee | null => 
    updateEmployee(id, employee),
    deleteEmployee: (_: unknown, { id }: { id: string }): boolean => deleteEmployee(id)
  },
};
