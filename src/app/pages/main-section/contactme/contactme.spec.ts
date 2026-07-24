import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Contactme } from './contactme';

describe('Contactme', () => {
  let component: Contactme;
  let fixture: ComponentFixture<Contactme>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contactme],
    }).compileComponents();

    fixture = TestBed.createComponent(Contactme);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
