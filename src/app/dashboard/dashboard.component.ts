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

  addProject(updatedProject) {
    if (!updatedProject) { return; }
    this.projectService.create(updatedProject)
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

  updateProject(project: Project, id: string) {
    // TODO Update Project
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
