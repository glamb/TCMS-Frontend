import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Suite } from '../models/suite.model';

@Injectable()
export class SuiteService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private projectsUrl = 'http://localhost:3000/api/projects';  // URL to web api

  constructor(private http: Http) { }

  getSuites(projId:string): Observable<Suite[]> {
    console.info(`${this.projectsUrl}/${projId}/suites`);
    return this.http.get(`${this.projectsUrl}/${projId}/suites`)
      .map(this.extractData);
  }

  getSuite(projId: string, suiteId: string): Observable<Suite> {
    return this.http.get(`${this.projectsUrl}/${projId}/suites/${suiteId}`)
      .map(this.extractData);
  }

  create(projId: string, payload): Observable<Suite> {
    let body = JSON.stringify(payload);
    let options = new RequestOptions({ headers: this.headers });

    return this.http.post(`${this.projectsUrl}/suites`, body, options)
      .map(this.extractData);
  }

  update(projId: string, suiteId: string, payload): Observable<Suite> {
    const selProjectUrl = `${this.projectsUrl}/${projId}/suites/${suiteId}`;
    console.log(selProjectUrl);
    let body = JSON.stringify(payload);
    let options = new RequestOptions({ headers: this.headers });

    return this.http.put(selProjectUrl, body, options)
      .map(this.extractData);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || [{ }];
  }
}
