import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Project } from '../models/project.model';
import { Suite } from '../models/suite.model';
import { ProjectService } from '../services/project.service';
import { SuiteService } from '../services/suite.service';
import { ApiService } from '../shared';

@Component({
  selector: 'tcms-dash',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  providers: [ ProjectService, SuiteService ]
})
export class ProjectComponent implements OnInit {
  suite: Suite;
  suites: Suite[];
  project: Project;
  errorMessage: string;
  strSuites: string;

  constructor(
    private projectService: ProjectService,
    private suiteService: SuiteService,
    private route: ActivatedRoute,
    private api: ApiService) { }

  getProject() {
    let projId = this.route.snapshot.params['projId'];
    this.projectService.getProject(projId)
      .subscribe(
        project => {
          this.project = project
          this.api.title = project.name;
        }
      );
  }

  ngOnInit() {
    this.getProject();
  }
}
