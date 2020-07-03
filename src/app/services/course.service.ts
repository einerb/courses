import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GlobalService } from './global.service';
import { Constant } from '../shared/constants';

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

  public createCourse(data: any) {
    return this.globalService.post(Constant.Endpoints.COURSE.CREATE, data).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public updateCourse(data: any) {
    return this.globalService
      .put(Constant.Endpoints.COURSE.UPDATE + '/' + data.id, data)
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