import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { SharedModule } from '../../shared/shared.module';
import { Global } from '../../models/global';
import Employee from '../../models/employee.model';
@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss',
})
export class AddEmployeeComponent implements OnInit {
  employeeForm: FormGroup = new FormGroup({});
  isSubmitted: boolean = false;
  empId!: number;
  global = new Global();
  constructor(
    private fb: FormBuilder,
    private empService: EmployeeService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.router.params.subscribe((data) => {
      this.empId = data?.['id'];
      if (this.empId) this.getEmployee();
    });
  }

  initializeForm() {
    this.employeeForm = this.fb.group({
      empId: ['', Validators.required],
      empName: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.pattern(this.global.emailPattern)],
      ],
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern(this.global.mobilePattern)],
      ],
      gender: ['', Validators.required],
      age: [null, Validators.required],
      phoneNumber: [''],
    });
  }

  get empForm() {
    return this.employeeForm.controls;
  }

  onSumbit() {
    this.isSubmitted = true;
    let empId = this.generateEmployeeId(
      10,
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    );
    this.employeeForm.controls['empId'].setValue(empId);
    if (this.employeeForm.invalid) return;

    if (this.empId) this.editEmployee();
    else this.addEmployee();
  }

  generateEmployeeId(length: number, chars: string) {
    var result = '';
    for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  getEmployee() {
    this.empService.getEmployee(this.empId).subscribe((employee: Employee) => {
      this.setEmployeeFields(employee);
    });
  }

  setEmployeeFields(employee: Employee) {
    this.employeeForm.setValue({
      empId: [employee.empId],
      empName: [employee.empName],
      email: [employee.email],
      mobileNumber: [employee.mobileNumber],
      gender: [employee.gender],
      age: [employee.age],
      phoneNumber: [employee.phoneNumber],
    });
  }

  addEmployee() {
    this.empService.addEmployee(this.employeeForm.value).subscribe(
      (data) => {
        console.log(data, 'Employee');
        this.employeeForm.reset();
        this.resetForm();
      },
      (err) => {
        alert('Something went wrong');
      }
    );
  }

  resetForm() {
    this.employeeForm.markAsUntouched();
    this.employeeForm.updateValueAndValidity();
  }

  editEmployee() {
    this.empService
      .updateEmployee(this.employeeForm.value, this.empId)
      .subscribe((data) => {});
  }
}
