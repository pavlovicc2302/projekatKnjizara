import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NarudzbenicePage } from './narudzbenice.page';

describe('NarudzbenicePage', () => {
  let component: NarudzbenicePage;
  let fixture: ComponentFixture<NarudzbenicePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NarudzbenicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
