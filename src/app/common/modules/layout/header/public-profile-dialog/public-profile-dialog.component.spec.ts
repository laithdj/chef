import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicProfileDialogComponent } from './public-profile-dialog.component';

describe('PublicProfileDialogComponent', () => {
  let component: PublicProfileDialogComponent;
  let fixture: ComponentFixture<PublicProfileDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicProfileDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicProfileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
