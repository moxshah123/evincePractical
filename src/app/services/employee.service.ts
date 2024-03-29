import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Employee from '../models/employee.model';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private URL: string = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.URL + 'employees');
  }

  getEmployee(id: number):Observable<Employee> {
    return this.http.get<Employee>(this.URL + 'employees/' + id);
  }

  addEmployee(employee: {}) {
    return this.http.post(this.URL + 'employees', employee);
  }

  updateEmployee(employee: {}, id: number) {
    return this.http.put(this.URL + 'employees/' + id , employee);
  }

  removeEmployee(id:number){
    return this.http.delete(this.URL + 'employees/' + id)
  }
}
