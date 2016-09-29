import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Project }                from '../models/project.model';
import { ProjectService }         from '../services/project.service';
import { ApiService } from '../shared';

@Component({
  selector: 'tcms-dash',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  providers: [ ProjectService ]
})
export class ProjectComponent implements OnInit {
  title: string;
  project: Project;
  errorMessage: string;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private api: ApiService) {
  }

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

  getSuites() {

  }

  ngOnInit() {
    this.getProject();
  }
}
