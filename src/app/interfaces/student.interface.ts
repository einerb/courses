export class Student {
  _id: string;
  name: string;
  lastname: string;
  email: string;
  age: number;

  constructor(item?: Student) {
    this._id = item && item._id ? item._id : null;
    this.name = item && item.name ? item.name : '';
    this.lastname = item && item.lastname ? item.lastname : null;
    this.email = item && item.email ? item.email : null;
    this.age = item && item.age ? item.age : 0;
  }
}
