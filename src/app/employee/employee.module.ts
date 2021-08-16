import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { EmployeeFormContainerComponent } from './employee-form-container/employee-form-container.component';
import { EmployeeFormPresentationComponent } from './employee-form-container/employee-form-presentation/employee-form-presentation.component';
import { EmployeeListContainerComponent } from './employee-list-container/employee-list-container.component';
import { EmployeeListPresentationComponent } from './employee-list-container/employee-list-presentation/employee-list-presentation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr/toastr/toastr.module';
import { EmployeeFormPresenterService } from './employee-form-container/employee-form-presenter/employee-form-presenter.service';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './employee.service';
import { SearchFilterPipe } from './searchfilter.pipe';
import { JwPaginationComponent } from 'jw-angular-pagination/lib/jw-pagination.component';



@NgModule({
  declarations: [
    EmployeeComponent,
    EmployeeFormContainerComponent,
    EmployeeFormPresentationComponent,
    EmployeeListContainerComponent,
    EmployeeListPresentationComponent,
    SearchFilterPipe,
   
    
  
    
 
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ReactiveFormsModule,
    ToastrModule,
    HttpClientModule,
    FormsModule
  ],
  providers:[EmployeeService]
})
export class EmployeeModule { }
