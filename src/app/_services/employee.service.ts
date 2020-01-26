import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Employee } from '../_models/employee.model';

@Injectable({providedIn: 'root'})
export class EmployeeService {
    constructor(private httpClient: HttpClient) { }
    getAllEmployees() {
        return this.httpClient.get<any>(environment.baseUrl + 'employees')
        .pipe(map( result => {
            return result.data;
        }));
    }
    addEmployee(employee: Employee) {
        return this.httpClient.post<any>(environment.baseUrl + 'create', employee)
        .pipe(map( result => {
            return result;
        }));
    }
    updateEmployee(employee) {
        return this.httpClient.put<any>(environment.baseUrl + 'update/' + employee.id , employee)
        .pipe(map( result => {
            return result;
        }));
    }
    deleteEmployee(id) {
        return this.httpClient.delete<any>(environment.baseUrl + 'delete/' + id )
        .pipe(map( result => {
            return result;
        }));
    }

}
