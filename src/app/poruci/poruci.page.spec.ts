import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PoruciPage } from './poruci.page';

describe('PoruciPage', () => {
  let component: PoruciPage;
  let fixture: ComponentFixture<PoruciPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PoruciPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
