import { Component, Input, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Test }  from '../models/test.model';
import { Suite }  from '../models/suite.model';
import { Project }  from '../models/project.model';
import { TestService } from '../services/test.service';

@Component({
  selector: 'tcms-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})

export class TestComponent implements OnInit {
  @Input() project: Project;
  @Input() suite: Suite;
  tests: Test[];
  input: boolean = false;
  tmpName: string;
  selectedTest: Test;
  errorMessage: string;

  constructor(private testService: TestService) { }

  getTests(projId: string, suiteId: string) {
    this.testService.getTest(projId, suiteId)
      .subscribe(
        tests => {
          this.tests = tests
        }
      );
  }

  updateOrCreate(newTest) {
    if (newTest._id) {
      // update project
      this.testService.update(this.project._id,this.suite._id, this.selectedTest._id, newTest)
        .subscribe(
          tests => this.getTests(this.project._id, this.suite._id),
          error => this.errorMessage = <any>error
        );
    } else {
      // new suite
      this.testService.create(this.project._id, this.suite._id, newTest)
        .subscribe(
          test => this.tests.unshift(test),
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

  onSelectTest(test: Test) {
    this.selectedTest = test;
    console.info(this.selectedTest);
  }

  ngOnInit() {
    this.getTests(this.project._id, this.suite._id);
  }
}
