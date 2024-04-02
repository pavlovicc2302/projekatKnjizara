import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DodajPage } from './dodaj.page';

describe('DodajPage', () => {
  let component: DodajPage;
  let fixture: ComponentFixture<DodajPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DodajPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
