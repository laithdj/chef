import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureEntryComponent } from './lecture-entry.component';

describe('LectureEntryComponent', () => {
  let component: LectureEntryComponent;
  let fixture: ComponentFixture<LectureEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LectureEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LectureEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
