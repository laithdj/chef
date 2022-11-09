import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCaptionsComponent } from './course-captions.component';

describe('CourseCaptionsComponent', () => {
  let component: CourseCaptionsComponent;
  let fixture: ComponentFixture<CourseCaptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseCaptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseCaptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
