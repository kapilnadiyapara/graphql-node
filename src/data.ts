import { Employee } from './types';

export let employees: Employee[] = [
  { id: '1', name: 'John Doe', position: 'Developer', salary: 50000 },
  { id: '2', name: 'Jane Smith', position: 'Manager', salary: 60000 },
];

export const addEmployee = (employee: Employee): Employee => {
  employees.push(employee);
  return employee;
};

export const updateEmployee = (id: string, employee: Partial<Employee>): Employee | null => {
  const index = employees.findIndex(emp => emp.id === id);
  if (index === -1) return null;
  employees[index] = { ...employees[index], ...employee };
  return employees[index];
};

export const deleteEmployee = (id: string): boolean => {
  const index = employees.findIndex(emp => emp.id === id);
  if (index === -1) return false;
  employees.splice(index, 1);
  return true;
};

export const getAllEmployee = (): Array<Employee> => {
    return employees;
}
