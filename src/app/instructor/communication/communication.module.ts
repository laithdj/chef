import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunicationComponent } from './communication.component';
import { CommunicationRoutingModule } from './communication-routing.module';

@NgModule({
  declarations: [CommunicationComponent],
  imports: [CommonModule, CommunicationRoutingModule],
})
export class CommunicationModule {}
