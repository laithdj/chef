import { NgModule } from '@angular/core';
import { MaterialUiModule } from '../material-ui/material-ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

const coreModules = [
  MaterialUiModule,
  NgbModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  MaterialUiModule,
  RouterModule,
];

@NgModule({
  imports: [coreModules],
  exports: [coreModules]
})
export class CoreModule { }
