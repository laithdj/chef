import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.scss'],
})
export class FilterListComponent implements OnInit {
  constructor() {}

  filters = [
    { name: 'Newest', id: 1 },
    { name: 'Newest2', id: 2 },
    { name: 'Newest3', id: 3 },
    { name: 'Newest4', id: 4 },
    { name: 'Newest5', id: 5 },
    { name: 'Newest6', id: 6 },
    { name: 'Newest7', id: 7 },
    { name: 'Newest8', id: 8 },
    { name: 'Newest9', id: 9 },
    { name: 'Newest0', id: 0 },
  ];

  ngOnInit(): void {}

  showmore: boolean = false;

  toggleShowmore() {
    this.showmore = !this.showmore;
  }
}
