import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTypeFormComponent } from './course-type-form.component';

describe('CourseTypeFormComponent', () => {
  let component: CourseTypeFormComponent;
  let fixture: ComponentFixture<CourseTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseTypeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
