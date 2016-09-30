import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule }  from '@angular/http';
import { FormsModule } from '@angular/forms';
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdCardModule } from '@angular2-material/card';
import { MdButtonModule } from '@angular2-material/button';
import { MdTabsModule } from '@angular2-material/tabs';
import { MdInputModule } from '@angular2-material/input';
import { MdIconModule } from '@angular2-material/icon';
import { MdListModule } from '@angular2-material/list';
import { ModalModule } from 'ng2-modal';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectModalComponent } from './dashboard/project-modal.component';
import { ProjectComponent } from './project/project.component';
import { SuiteComponent } from './project/suite.component';
import { TestComponent } from './project/test.component';
import { ApiService } from './shared';
import { ProjectService } from './services/project.service';
import { SuiteService } from './services/suite.service';
import { TestService } from './services/test.service';
import { routing } from './app.routing';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    FormsModule,
    routing,
    ModalModule,
    MdToolbarModule.forRoot(),
    MdCardModule.forRoot(),
    MdButtonModule.forRoot(),
    MdTabsModule.forRoot(),
    MdInputModule.forRoot(),
    MdIconModule.forRoot(),
    MdListModule.forRoot()
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    ProjectModalComponent,
    ProjectComponent,
    SuiteComponent,
    TestComponent
  ],
  providers: [
    ApiService,
    ProjectService,
    SuiteService,
    TestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
