import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { Project } from '../models/project.model';

@Injectable()
export class ProjectService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private projectsUrl = 'http://localhost:3000/api/projects';  // URL to web api

  constructor(private http: Http) { }

  getProjects(): Observable<Project[]> {
    return this.http.get(this.projectsUrl)
      .map(this.extractData);
  }

  create(projectPayload): Observable<Project> {
    let body = JSON.stringify(projectPayload);
    let options = new RequestOptions({ headers: this.headers });

    return this.http.post(this.projectsUrl, body, options)
      .map(this.extractData);
  }

  delete(id: string): Observable<Project> {
    const selProjectUrl = `${this.projectsUrl}/${id}`;
    console.log(selProjectUrl);
    return this.http.delete(selProjectUrl, {headers: this.headers})
      .map(this.extractData);
  }

  update(projectPayload, id): Observable<Project> {
    const selProjectUrl = `${this.projectsUrl}/${id}`;
    let body = JSON.stringify(projectPayload);
    let options = new RequestOptions({ headers: this.headers });

    return this.http.put(selProjectUrl, body, options)
      .map(this.extractData);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || [{ }];
  }

}
