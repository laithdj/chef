import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import { StudentRoutingModule } from './student-routing.module';
import { CoreModule } from 'src/app/common/modules/core/core.module';

@NgModule({
  declarations: [StudentComponent],
  imports: [CommonModule, StudentRoutingModule, CoreModule],
})
export class StudentModule {}
