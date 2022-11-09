import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCourseBlogComponent } from './manage-course-blog.component';

describe('ManageCourseBlogComponent', () => {
  let component: ManageCourseBlogComponent;
  let fixture: ComponentFixture<ManageCourseBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCourseBlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCourseBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
