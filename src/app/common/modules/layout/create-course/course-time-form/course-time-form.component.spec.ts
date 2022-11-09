import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTimeFormComponent } from './course-time-form.component';

describe('CourseTimeFormComponent', () => {
  let component: CourseTimeFormComponent;
  let fixture: ComponentFixture<CourseTimeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseTimeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseTimeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
