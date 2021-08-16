import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

import { EmployeeFormContainerComponent } from '../employee-form-container.component';
import { EmployeeFormPresenterService } from '../employee-form-presenter/employee-form-presenter.service';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Employee } from '../../employee';

@Component({
  selector: 'app-employee-form-presentation',
  templateUrl: './employee-form-presentation.component.html',
  styleUrls: ['./employee-form-presentation.component.scss'],
  viewProviders: [EmployeeFormPresenterService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeFormPresentationComponent implements OnInit {


  public EmpForm!: FormGroup;
  private _employeeData!: Employee;

  @Output() add: EventEmitter<Employee>;
  @Output() update: EventEmitter<Employee>;

  public  destroy: Subject<void>;
   
  

   @Input() set employeeDetails(value: Employee) {

    this._employeeData = value;
    if (value) {
      this.EmpForm = this.employeepresenter.
        bindControlValue(this.EmpForm,
          this._employeeData);
    }
  }
  get employeeDetails(): Employee{
    return this._employeeData;
  }
  constructor( private employeepresenter:EmployeeFormPresenterService, private toastr:ToastrService,
               private employeecontainer:EmployeeFormContainerComponent, private router: Router  ) {
    this.destroy = new Subject();
    this.add = new EventEmitter();
    this.update = new EventEmitter();
    this.EmpForm = this.employeepresenter.buildForm();
   }
   ngOnInit() {
    this.employeepresenter.add$.pipe(takeUntil(this.destroy)).subscribe((employee: Employee) => {
      if (this.employeeDetails) {
        this.update.emit(employee);
      } else {
        this.add.emit(employee);
      }
    });
  }
  public employee(): void {

    this.employeepresenter.saveemployee(this.EmpForm);
    this.employeecontainer.message$.pipe(takeUntil(this.destroy)).subscribe((response: string) => {
      if (response.toLowerCase() === 'update') {
        this.toastr.success('e,ployee Update Successfully', 'Success');
      } else {
        this.toastr.success('employee Successfully Submitted', 'Success');
      }
      this.router.navigate(['/employee/view']);
    });
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
  get employeeform(){
    return this.EmpForm.controls
  }

}

