import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-catagory-summary',
  templateUrl: './catagory-summary.component.html',
  styleUrls: ['./catagory-summary.component.scss']
})
export class CatagorySummaryComponent implements OnInit {
  @Input() data: any;

  constructor() { }

  ngOnInit(): void {
  }

}
