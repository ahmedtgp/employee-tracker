import { NgModule } from '@angular/core';

import { EmployeesComponent } from './employees.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmployeeActionDailogComponent } from './employee-action-dailog/employee-action-dailog.component';
import { SharedModule } from '../_shared/shared.module';


@NgModule({
    declarations: [
        EmployeesComponent,
        EmployeesListComponent,
        EmployeeActionDailogComponent
    ],
    imports: [
        SharedModule,
     ],
    exports: [],
    providers: [],
    entryComponents: [
        EmployeeActionDailogComponent,
      ],
})
export class EmployeesModule {}
