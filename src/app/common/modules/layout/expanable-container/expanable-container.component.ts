import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expanable-container',
  templateUrl: './expanable-container.component.html',
  styleUrls: ['./expanable-container.component.scss'],
})
export class ExpanableContainerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  showmore: boolean = false;

  toggleShowmore() {
    this.showmore = !this.showmore;
  }
}
