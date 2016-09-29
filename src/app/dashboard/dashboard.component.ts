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

  changeProjectStatus(projState: string) {
    const projPayload = {status: projState};
//    console.log ("changeProjecStatus: ", projPayload, this.selectedProject._id)
    this.projectService.update(projPayload, this.selectedProject._id)
      .subscribe(
        project => this.getProjects(),
        error => this.errorMessage = <any>error
      );
  }

  deleteProject() {
    this.projectService.delete(this.selectedProject._id)
      .subscribe(
        project => this.getProjects(),
        error => this.errorMessage = <any>error
      );
  }


  onSelectProject(project: Project) {
    this.selectedProject = project;
  }

//  updateProject(project: Project, id: string) {
/*  updateProject(updProject) {
    // TODO Update Project
    console.log("updateProject: " + updProject);
    if (!updProject) { return; }
    this.projectService.update(updProject, this.selectedProject._id)
      .subscribe(
        project => this.projects.unshift(project),
        error => this.errorMessage = <any>error
      );
  }
*/
  updateOrCreate(newProj) {
    if (newProj._id) {
      // update project
      this.projectService.update(newProj, this.selectedProject._id)
        .subscribe(
          project => this.getProjects(),
          error => this.errorMessage = <any>error
        );
    } else {
      // new project
      this.projectService.create(newProj)
        .subscribe(
          project => this.projects.unshift(project),
          error => this.errorMessage = <any>error
        );
    }
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
