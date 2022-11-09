import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolsComponent } from './tools.component';
import { ToolsRoutingModule } from './tools-routing.module';

@NgModule({
  declarations: [ToolsComponent],
  imports: [CommonModule, ToolsRoutingModule],
})
export class ToolsModule {}
