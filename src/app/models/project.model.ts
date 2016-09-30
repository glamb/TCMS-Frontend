export class Project {
  name: string;
  description: string;
  _id: string;
  status: string;
  img_id: number;

  constructor(json) {
    this.name = json.name;
    this.description = json.description;
    this._id = json._id;
    this.status = json.status;
    this.img_id = json.img_id;
  }
}
