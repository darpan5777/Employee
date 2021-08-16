import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr/toastr/toastr.service';
import { Employee } from '../../employee';
import { EmployeeService } from '../../employee.service';
import { EmployeeListContainerComponent } from '../employee-list-container.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-employee-list-presentation',
  templateUrl: './employee-list-presentation.component.html',
  styleUrls: ['./employee-list-presentation.component.scss']
})
export class EmployeeListPresentationComponent implements OnInit {
  items = [];
  pageOfItems!: Array<any>;
  public searchFilter: any = '';

  @Input() public set Response(Response: Employee[]) {
    if (Response) {
      this._Response = Response;
    }
  }
  public get Response(): Employee[] {
    return this._Response;
  }
  private _Response!: Employee[];

@Output() public deleteEvent: EventEmitter<number> = new EventEmitter<number>();

constructor(private employeeContainer: EmployeeListContainerComponent, private toastr: ToastrService, private router: Router,
  private employeeservice:EmployeeService) { }

ngOnInit() {
     
}



public deleteemployee(deleteId: number): void {
  debugger
  this.deleteEvent.emit(deleteId);
  this.employeeContainer.message$.subscribe((response) => {
    if (response.toLowerCase() === 'delete') {
      this.toastr.success(' delete successfully', 'Success');
    }
    this.router.navigate(['']);

  });
}

}
















 