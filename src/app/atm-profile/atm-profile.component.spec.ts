import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmProfileComponent } from './atm-profile.component';

describe('AtmProfileComponent', () => {
  let component: AtmProfileComponent;
  let fixture: ComponentFixture<AtmProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtmProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtmProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
