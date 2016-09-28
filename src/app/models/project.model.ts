export class Project {
  name: string;
  description: string;
  _id: string;

  constructor(json) {
    this.name = json.name;
    this.description = json.description;
    this._id = json._id;
  }
}
