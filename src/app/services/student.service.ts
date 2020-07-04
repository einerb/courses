import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Constant } from '../shared/constants';
import { GlobalService } from './global.service';
import { Student } from '../interfaces/student.interface';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private globalService: GlobalService) {}

  public getAll(): Observable<any> {
    return this.globalService.get(Constant.Endpoints.STUDENT.ALL).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public getById(id: any) {
    return this.globalService
      .get(Constant.Endpoints.STUDENT.ALL + '/' + id)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public countStudent(id: any) {
    return this.globalService
      .get(Constant.Endpoints.STUDENT.COUNT + '/' + id)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public createStudent(student: Student) {
    return this.globalService
      .post(Constant.Endpoints.STUDENT.CREATE, student)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public updateStudent(student: Student) {
    return this.globalService
      .put(Constant.Endpoints.STUDENT.UPDATE + '/' + student._id, student)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public assignCourse(id: any, data: any) {
    return this.globalService
      .put(Constant.Endpoints.STUDENT.ASSIGN + '/' + id, data)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public deleteStudent(id: any) {
    return this.globalService
      .delete(Constant.Endpoints.STUDENT.DELETE + '/' + id)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
