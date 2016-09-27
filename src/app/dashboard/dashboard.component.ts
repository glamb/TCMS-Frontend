import { Component, OnInit } from '@angular/core';

import { Project }                from '../models/project.model';
import { ProjectService }         from '../services/project.service';

@Component({
  selector: 'tcms-dash',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [ ProjectService ]
})
export class DashboardComponent implements OnInit {
  projects: Project[];
  errorMessage: string;

  constructor(
    private projectService: ProjectService) { }

  addProject(name: string, desc: string) {
    if (!name) { return; }
    this.projectService.create(name, desc)
      .subscribe(
        project => this.projects.unshift(project),
        error => this.errorMessage = <any>error
      );
  }

  getProjects() {
    this.projectService.getProjects()
      .subscribe(
        projects => this.projects = projects,
        error =>  this.errorMessage = <any>error);
  }

  refresh() {
    this.getProjects();
  }

  ngOnInit() {
    this.getProjects();
  }
}
