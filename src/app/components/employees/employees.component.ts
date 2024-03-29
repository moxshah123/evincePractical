import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import Employee from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent {
  employeesList: Employee[] = [];
  sortKey: any;
  sortDirection: string = 'desc';
  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe((employees: Employee[]) => {
      if (employees && employees.length > 0) {
        this.employeesList = employees;
      }
    });
  }

  sortEmployees(key:any ) {
    this.sortKey = key;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';

    this.employeesList.sort((a:any, b:any) => {
      const valueA = String(a[this.sortKey]).toLowerCase();
      const valueB = String(b[this.sortKey]).toLowerCase();

      if (this.sortDirection === 'asc') return valueA.localeCompare(valueB);
      else return valueB.localeCompare(valueA); 
    });
  }

  openDialog(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      action: 'Delete',
      id,
    };
    dialogConfig.width = '400px';
    dialogConfig.height = '150px';

    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      alert(data);
    });
  }
}
