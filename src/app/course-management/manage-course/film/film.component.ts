import { Component, OnInit } from '@angular/core';
import _DATA from '../shared/blogs-data';


@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss'],
})
export class FilmComponent implements OnInit {
  DATA = _DATA.Film;

  constructor() {}

  ngOnInit(): void {}
}
