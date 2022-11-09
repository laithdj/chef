import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratePromoCodeComponent } from './generate-promo-code.component';

describe('GeneratePromoCodeComponent', () => {
  let component: GeneratePromoCodeComponent;
  let fixture: ComponentFixture<GeneratePromoCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratePromoCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratePromoCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
