import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpanableContainerComponent } from './expanable-container.component';

describe('ExpanableContainerComponent', () => {
  let component: ExpanableContainerComponent;
  let fixture: ComponentFixture<ExpanableContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpanableContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpanableContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
