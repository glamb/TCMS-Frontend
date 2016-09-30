import { Component, OnInit } from '@angular/core';

// import { Project }                from '../models/project.model';
import { ProjectService }         from '../services/project.service';

@Component({
  selector: 'tcms-dash',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  providers: [ ProjectService ]
})
export class ProjectComponent implements OnInit {

  ngOnInit() {
  }
}
