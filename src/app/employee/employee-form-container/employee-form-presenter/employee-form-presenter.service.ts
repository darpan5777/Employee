import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { Employee } from '../../employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeFormPresenterService {

 public add$: Observable<Employee>;

 private add: Subject<Employee> = new Subject();
  message$: any;
  constructor(private fb: FormBuilder, ) {
    this.add$ = this.add.asObservable();
   }
  
  public buildForm(): FormGroup {
    return this.fb.group({
        id: [''],
       Firstname: ['', Validators.compose([Validators.required])],
       Lastname: ['', Validators.compose([Validators.required])],
       Birthdate: ['', Validators.compose([Validators.required])],
       Gender: ['', Validators.compose([Validators.required])],
       Department: ['', Validators.compose([Validators.required])]

    });
}
public bindControlValue(EmpForm: FormGroup, employee:Employee): FormGroup {
  if (employee) {
      EmpForm.patchValue(employee);
  }
  return EmpForm;
}
public saveemployee(EmpForm: FormGroup): void {
  if (EmpForm.valid) {
      let employee: Employee = new Employee();
      employee = EmpForm.getRawValue();
      this.add.next(employee);
  } else {
  }
}
}
