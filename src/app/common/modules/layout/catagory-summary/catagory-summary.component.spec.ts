import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatagorySummaryComponent } from './catagory-summary.component';

describe('CatagorySummaryComponent', () => {
  let component: CatagorySummaryComponent;
  let fixture: ComponentFixture<CatagorySummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatagorySummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatagorySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
