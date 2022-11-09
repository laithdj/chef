import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCurriculamComponent } from './course-curriculam.component';

describe('CourseCurriculamComponent', () => {
  let component: CourseCurriculamComponent;
  let fixture: ComponentFixture<CourseCurriculamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseCurriculamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseCurriculamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
