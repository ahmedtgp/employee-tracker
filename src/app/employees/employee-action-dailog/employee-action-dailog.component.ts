import { Component, OnInit, Inject, Optional } from '@angular/core';
import { Employee } from 'src/app/_models/employee.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee-action-dailog',
  templateUrl: './employee-action-dailog.component.html',
  styleUrls: ['./employee-action-dailog.component.scss']
})
export class EmployeeActionDailogComponent implements OnInit {

  action: string;
  employeeData: any;

  constructor(
    public dialogRef: MatDialogRef<EmployeeActionDailogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Employee) {}


  ngOnInit() {
    console.log(this.data);
    this.employeeData = {...this.data};
    this.action = this.employeeData.action;
  }

  doAction(form?: NgForm) {
    if (form) {
      this.employeeData.employee_name = form.value.name;
      this.employeeData.employee_salary = form.value.salary;
      this.employeeData.employee_age = form.value.age;
      this.dialogRef.close({event: this.action, data: this.employeeData});
    } else {
      console.log(form);
      this.dialogRef.close({event: this.action, data: this.employeeData});
    }

  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

}
