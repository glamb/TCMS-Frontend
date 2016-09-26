export class Project {
  name: string;
  description: string;

  constructor(json) {
    this.name = json.name;
    this.description = json.description;
  }
}