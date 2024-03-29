import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss',
})
export class ConfirmationComponent {
  action: string = '';
  id: number = 0;
  constructor(
    private employeeService: EmployeeService,
    private dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.action = data.action;
    this.id = data.id;
  }

  removeEmployee() {
    console.log(this.id)
    this.employeeService.removeEmployee(this.id).subscribe(
      (data) => {
        if (data) this.closeDialog('success');
      },
      (error) => this.closeDialog('error')
    );
  }

  closeDialog(result: string) {
    this.dialogRef.close(result);
  }
}
