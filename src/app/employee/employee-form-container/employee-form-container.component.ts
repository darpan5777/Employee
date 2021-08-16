import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { filter } from 'rxjs/internal/operators/filter';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { Subject } from 'rxjs/internal/Subject';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-form-container',
  templateUrl: './employee-form-container.component.html',
  styleUrls: ['./employee-form-container.component.scss']
})
export class EmployeeFormContainerComponent implements OnInit {
  
  public employee$: Observable<any> = this.route.paramMap.pipe(
    filter(params => params.has('id')),
    switchMap(params => this.employeeservice.getemployeeById(params.get('id')!)),
  );
  public message: Subject<string> = new Subject();

  public message$: Observable<string>;



  constructor(private employeeservice:EmployeeService, private route: ActivatedRoute) {
    this.message$ = this.message.asObservable();
  }

  ngOnInit() { }

  public addemployee(employee: Employee): void {

    this.employeeservice.createemployee(employee).subscribe(response => {
      if (response) {
        this.message.next('add');
      }
    });
  }

  public updateemployee(employee: Employee): void {

    this.employeeservice.updateemployee(employee).subscribe(response => {
      if (response) {
        this.message.next('update');
      }
    });
  }


}