import { Component, Input, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Suite }  from '../models/suite.model';
import { Project }  from '../models/project.model';
import { SuiteService } from '../services/suite.service';

@Component({
  selector: 'tcms-suites',
  templateUrl: './suite.component.html',
  styleUrls: ['./suite.component.scss']
})

export class SuiteComponent implements OnInit {
  @Input() project: Project;
  suites: Suite[];
  strSuites: string;
  input: boolean = false;
  tmpName: string;
  selectedSuite: Suite;
  errorMessage: string;
  showTests: boolean = false;

  constructor(private suiteService: SuiteService) { }

  getSuites(projId) {
    console.info(projId);
    this.suiteService.getSuites(projId)
      .subscribe(
        suites => {
          this.suites = suites
        }
      );
  }

  updateOrCreate(newSuite) {
    if (newSuite._id) {
      // update project
      this.suiteService.update(this.project._id, this.selectedSuite._id, newSuite)
        .subscribe(
          suites => this.getSuites(this.project._id),
          error => this.errorMessage = <any>error
        );
    } else {
      // new suite
      this.suiteService.create(this.project._id, newSuite)
        .subscribe(
          suite => this.suites.unshift(suite),
          error => this.errorMessage = <any>error
        );
    }
    this.tmpName = null;
  }

  inputSwitch() {
    if (this.input) {
      this.input = false;
    } else {
      this.input = true;
    }
  }

  toggleTests() {
    if (this.showTests) {
      this.showTests = false;
    } else {
      this.showTests = true;
    }
  }

  onSelectSuite(suite: Suite) {
    this.selectedSuite = suite;
    console.info(this.selectedSuite);
  }

  ngOnInit() {
    this.getSuites(this.project._id);
  }
}