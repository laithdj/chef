import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseBasicsComponent } from './course-basics.component';

describe('CourseBasicsComponent', () => {
  let component: CourseBasicsComponent;
  let fixture: ComponentFixture<CourseBasicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseBasicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseBasicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
