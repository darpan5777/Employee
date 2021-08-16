import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list-container',
  templateUrl: './employee-list-container.component.html',
  styleUrls: ['./employee-list-container.component.scss']
})
export class EmployeeListContainerComponent implements OnInit {
  public employeeDataList$: Observable<Employee[]> = this.employeeService.getOrders();

  public message: Subject<string> = new Subject();

  public message$: Observable<string>;


  constructor(
    private employeeService: EmployeeService
  ) {
    this.message$ = this.message.asObservable();
  }

  ngOnInit() {
  }
  public deleteemployee(empId: number): void {

    this.employeeService.deleteemployee(empId).subscribe(response => {
      if (response) {
        this.message.next('delete');
        this.employeeDataList$ = this.employeeService.getOrders();
      }
    });
  }
}
