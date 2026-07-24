import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Leagalnotice } from './leagalnotice';

describe('Leagalnotice', () => {
  let component: Leagalnotice;
  let fixture: ComponentFixture<Leagalnotice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Leagalnotice],
    }).compileComponents();

    fixture = TestBed.createComponent(Leagalnotice);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
