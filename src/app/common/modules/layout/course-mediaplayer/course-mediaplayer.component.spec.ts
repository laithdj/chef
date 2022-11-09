import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseMediaplayerComponent } from './course-mediaplayer.component';

describe('CourseMediaplayerComponent', () => {
  let component: CourseMediaplayerComponent;
  let fixture: ComponentFixture<CourseMediaplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseMediaplayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseMediaplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
