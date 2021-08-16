import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { BehaviorSubject } from 'rxjs';
import { Employee } from './employee';


@Injectable()
export class EmployeeService {
  [x: string]: any;

  public Url = 'http://localhost:3000/';
  updateData: any;

  constructor(  private httpClient: HttpClient) { }



  public getemployee(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.Url + 'employeedetails');
  }

  public sendemployee(data: Employee): void {
    this.updateData.next(data);
  }

  public getemployee(): Observable<Employee> {
    return this.updateData.asObservable();
  }
  
  public getemployeeById(id: string): Observable<Employee> {
    return this.httpClient.get<Employee>(this.Url + 'employee/' + id);
  }
  
  public createemployee(employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(`${this.Url + 'employee'}`, employee);
  }

 
  public updateemployee(employee: Employee): Observable<Employee> {
    return this.httpClient.put<Employee>(`${this.Url + 'employee'}/${employee.id}`, employee);
  }

 
  public deleteemployee(employeeId: number): Observable<Employee[]> {
    return this.httpClient.delete<Employee[]>(`${this.Url + 'employee'}/${employeeId}`);
  }
}

