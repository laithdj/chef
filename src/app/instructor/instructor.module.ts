import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructorComponent } from './instructor.component';
import { InstructorRoutingModule } from './instructor-routing.module';
import { CoreModule } from '../common/modules/core/core.module';
import { LayoutModule } from '../common/modules/layout/layout.module';

@NgModule({
  declarations: [InstructorComponent],
  imports: [CommonModule, InstructorRoutingModule, CoreModule, LayoutModule],
})
export class InstructorModule {}
