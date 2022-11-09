import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerformanceComponent } from './performance.component';
import { PerformanceRoutingModule } from './performance-routing.module';

@NgModule({
  declarations: [PerformanceComponent],
  imports: [CommonModule, PerformanceRoutingModule],
})
export class PerformanceModule {}
