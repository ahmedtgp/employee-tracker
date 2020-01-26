import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatTable } from '@angular/material';
import { Subscription } from 'rxjs';
import { Employee } from 'src/app/_models/employee.model';
import { EmployeeService } from 'src/app/_services/employee.service';
import { EmployeeActionDailogComponent } from '../employee-action-dailog/employee-action-dailog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit, AfterViewInit {

  displayedColumns = ['position', 'name', 'salary', 'age', 'action'];
  dataSource = new MatTableDataSource<Employee>();
  employeesSubscription: Subscription;

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private employeeService: EmployeeService, public dialog: MatDialog) {}

  ngOnInit() {
    this.employeeService.getAllEmployees().subscribe((employeesList: Employee[]) => {
      this.dataSource.data = employeesList;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog(action, rowData) {
    rowData.action = action;
    const dialogRef = this.dialog.open(EmployeeActionDailogComponent, {
      width: '400px',
      data: rowData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Add') {
        this.addRowData(result.data);
      } else if (result.event === 'Update') {
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(empData: Employee) {
    this.employeeService.addEmployee(empData).subscribe(
      result => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Added Successfully',
          showConfirmButton: false,
          timer: 1500
        });
        this.dataSource.data.push(empData);
        this.table.renderRows();
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error,
        });
      });
  }
  updateRowData(empData: Employee) {
    this.employeeService.updateEmployee(empData).subscribe(
      result => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Updated Successfully',
          showConfirmButton: false,
          timer: 1500
        });
        this.dataSource.data = this.dataSource.data.filter((value) => {
          if (value.id === empData.id) {
            value.employee_name = empData.employee_name;
            value.employee_salary = empData.employee_salary;
            value.employee_age = empData.employee_age;
          }
        });
        this.table.renderRows();
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error,
        });
      });
  }
  deleteRowData(empData: Employee) {
    this.employeeService.deleteEmployee(empData.id).subscribe(
      result => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Deleted Successfully',
          showConfirmButton: false,
          timer: 1500
        });
        this.dataSource.data = this.dataSource.data.filter((value) => {
          return value.id !== empData.id;
        });
        this.table.renderRows();
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error,
        });
      });
  }
}
