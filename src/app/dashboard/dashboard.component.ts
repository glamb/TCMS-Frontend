import { Component, OnInit, ViewChild } from '@angular/core';

import { Project }                from '../models/project.model';
import { ProjectService }         from '../services/project.service';
import { ProjectModelComponent }  from './project-modal.component';

@Component({
  selector: 'tcms-dash',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [ ProjectService ]
})
export class DashboardComponent implements OnInit {
  @ViewChild(ProjectModelComponent) projectModal: ProjectModelComponent;
  projects: Project[];
  errorMessage: string;
  selectedProject: Project;


  constructor(
    private projectService: ProjectService) { }

  addProject(newProject) {
    if (!newProject) { return; }
    this.projectService.create(newProject)
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


 onSelectProject(project: Project) {
    this.selectedProject = project;
  }

//  updateProject(project: Project, id: string) {
  updateProject(updProject) {
    // TODO Update Project
    console.log("updateProject: " + updProject);
    if (!updProject) { return; }
    this.projectService.update(updProject)
      .subscribe(
        project => this.projects.unshift(project),
        error => this.errorMessage = <any>error
      );
  }

  showModal(project?: Project) {
    if (project) {
      this.projectModal.showProjModal(project);
    } else {
      this.projectModal.showProjModal();
    }
  }

  hideModal() {
    this.projectModal.hideProjModal();
  }

  ngOnInit() {
    this.getProjects();
  }
}
