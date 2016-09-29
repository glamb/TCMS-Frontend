import { Component, Input, Output, EventEmitter } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Project }  from '../models/project.model';

@Component({
  selector: 'tcms-proj-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.scss']
})

export class ProjectModalComponent {
  @Output() projectRequest = new EventEmitter<any>();
  project: Project;
  modalVisible: boolean;
  title: string;
  tmpProject: any = {};

  showProjModal(project?: Project) {
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
    if (this.project) {
      nProject.value._id = this.project._id;
    }
    this.projectRequest.emit(nProject.value);
  }
}

