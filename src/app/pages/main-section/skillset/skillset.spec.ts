import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Skillset } from './skillset';

describe('Skillset', () => {
  let component: Skillset;
  let fixture: ComponentFixture<Skillset>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Skillset],
    }).compileComponents();

    fixture = TestBed.createComponent(Skillset);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
