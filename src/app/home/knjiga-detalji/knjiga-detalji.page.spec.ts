import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KnjigaDetaljiPage } from './knjiga-detalji.page';

describe('KnjigaDetaljiPage', () => {
  let component: KnjigaDetaljiPage;
  let fixture: ComponentFixture<KnjigaDetaljiPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(KnjigaDetaljiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
