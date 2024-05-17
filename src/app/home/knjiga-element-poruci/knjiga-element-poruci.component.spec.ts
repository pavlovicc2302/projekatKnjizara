import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KnjigaElementPoruciComponent } from './knjiga-element-poruci.component';

describe('KnjigaElementPoruciComponent', () => {
  let component: KnjigaElementPoruciComponent;
  let fixture: ComponentFixture<KnjigaElementPoruciComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KnjigaElementPoruciComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KnjigaElementPoruciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
