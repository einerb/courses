import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Constant } from '../shared/constants';
import { Course } from '../interfaces/course.interface';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private globalService: GlobalService) {}

  public getAll(): Observable<any> {
    return this.globalService.get(Constant.Endpoints.COURSE.ALL).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public getById(id: any) {
    return this.globalService
      .get(Constant.Endpoints.COURSE.ALL + '/' + id)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public createCourse(course: Course) {
    return this.globalService
      .post(Constant.Endpoints.COURSE.CREATE, course)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public updateCourse(course: Course) {
    return this.globalService
      .put(Constant.Endpoints.COURSE.UPDATE + '/' + course._id, course)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public deleteCourse(id: any) {
    return this.globalService
      .delete(Constant.Endpoints.COURSE.DELETE + '/' + id)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
