import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Project } from '../models/project.model';

@Injectable()
export class ProjectService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private projectsUrl = 'http://localhost:3000/api/projects/  ';  // URL to web api

  constructor(private http: Http) { }

  getProjects(): Observable<Project[]> {
    return this.http.get(this.projectsUrl)
      .map(this.extractData);
  }

  create(name: string, desc: string): Observable<Project> {
    let body = JSON.stringify({name: name, description: desc});
    let options = new RequestOptions({ headers: this.headers });

    return this.http.post(this.projectsUrl, body, options)
      .map(this.extractData);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || [{ }];
  }
}
