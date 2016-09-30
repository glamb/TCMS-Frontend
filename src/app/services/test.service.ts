import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Test } from '../models/test.model';

@Injectable()
export class TestService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private projectsUrl = 'http://localhost:3000/api/projects';  // URL to web api

  constructor(private http: Http) { }

  getTest(projId: string, suiteId: string ): Observable<Test[]> {
    return this.http.get(`${this.projectsUrl}/${projId}/suites/${suiteId}/tests`)
      .map(this.extractData);
  }

  getSuite(projId: string, suiteId: string, testId: string): Observable<Test> {
    return this.http.get(`${this.projectsUrl}/${projId}/suites/${suiteId}/tests/${testId}`)
      .map(this.extractData);
  }

  create(projId: string, suiteId:string, payload): Observable<Test> {
    let body = JSON.stringify(payload);
    let options = new RequestOptions({ headers: this.headers });

    return this.http.post(`${this.projectsUrl}/${projId}/suites/${suiteId}/tests`, body, options)
      .map(this.extractData);
  }

  update(projId: string, suiteId: string, testId: string, payload): Observable<Test> {
    const selProjectUrl = `${this.projectsUrl}/${projId}/suites/${suiteId}/tests/${testId}`;
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
