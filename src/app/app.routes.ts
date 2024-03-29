import { Routes } from '@angular/router';
import { EmployeesComponent } from './components/employees/employees.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';

export const routes: Routes = [
    {
        path: "",
        component:EmployeesComponent
    },
    {
        path: "add-employee",
        component:AddEmployeeComponent
    },
    {
        path: "add-employee/:id",
        component:AddEmployeeComponent
    }
];
