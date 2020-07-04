export class Course {
  _id: string;
  name: string;
  schedule: string;
  start_date: string;
  end_date: string;

  constructor(item?: Course) {
    this._id = item && item._id ? item._id : null;
    this.name = item && item.name ? item.name : '';
    this.schedule = item && item.schedule ? item.schedule : null;
    this.start_date = item && item.start_date ? item.start_date : null;
    this.end_date = item && item.end_date ? item.end_date : null;
  }
}

export class Assignment extends Course {
  courses: string;
}
