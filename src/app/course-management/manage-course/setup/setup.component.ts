import { Component, OnInit } from '@angular/core';
import _DATA from '../shared/blogs-data';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
})
export class SetupComponent implements OnInit {
  DATA = _DATA.Setup;

  constructor() {}

  ngOnInit(): void {}
}
