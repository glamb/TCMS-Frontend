import { Component, Input, Output, EventEmitter } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Project }  from '../models/project.model';

@Component({
  selector: 'tcms-proj-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.scss']
})

export class ProjectModelComponent {
  @Output() projectRequest = new EventEmitter<any>();
  project: Project;
  modalVisible: boolean;
  title: string;
  tmpProject: any = {};

  showProjModal(project?: Project) {
    console.log("showProjModal: " + project.name);
    if (project) {
      this.project = project;
    } else {
      this.project = undefined;
    }
    console.info(this.project);
    this.modalVisible = true;
  }

  hideProjModal() {
    this.modalVisible = false;
  }

  request(nProject: NgForm) {
    console.log("request: " + nProject.name);
    this.projectRequest.emit(nProject.value);
  }
}

