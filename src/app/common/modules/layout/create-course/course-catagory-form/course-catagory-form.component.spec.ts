import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCatagoryFormComponent } from './course-catagory-form.component';

describe('CourseCatagoryFormComponent', () => {
  let component: CourseCatagoryFormComponent;
  let fixture: ComponentFixture<CourseCatagoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseCatagoryFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseCatagoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
