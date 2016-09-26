// This shows a different way of testing a component, check about for a simpler one
import { Component } from '@angular/core';

import { TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';

describe('Dashboard Component', () => {
  const html = '<tcms-dash></tcms-dash>';

  beforeEach(() => {
    TestBed.configureTestingModule({declarations: [DashboardComponent, TestComponent]});
    TestBed.overrideComponent(TestComponent, { set: { template: html }});
  });

  it('should ...', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.children[0].textContent).toContain('Dashboard Works!');
  });

});

@Component({selector: 'my-test', template: ''})
class TestComponent { }
