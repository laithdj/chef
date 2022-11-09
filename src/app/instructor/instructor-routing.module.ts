import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorComponent } from './instructor.component';

const routes: Routes = [
  {
    path: '',
    component: InstructorComponent,
    children: [
      {
        path: 'courses',
        loadChildren: () =>
          import('./courses/courses.module').then((m) => m.CoursesModule),
      },
      {
        path: 'communication',
        loadChildren: () =>
          import('./communication/communication.module').then((m) => m.CommunicationModule),
      },
      {
        path: 'performance',
        loadChildren: () =>
          import('./performance/performance.module').then((m) => m.PerformanceModule),
      },
      {
        path: 'tools',
        loadChildren: () =>
          import('./tools/tools.module').then((m) => m.ToolsModule),
      },
      {
        path: 'resources',
        loadChildren: () =>
          import('./resources/resources.module').then((m) => m.ResourcesModule),
      },
      {
        path: '', pathMatch: 'full', 
        loadChildren: () =>
          import('./courses/courses.module').then((m) => m.CoursesModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorRoutingModule {}
