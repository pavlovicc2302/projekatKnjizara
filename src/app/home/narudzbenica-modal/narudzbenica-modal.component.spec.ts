import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NarudzbenicaModalComponent } from './narudzbenica-modal.component';

describe('NarudzbenicaModalComponent', () => {
  let component: NarudzbenicaModalComponent;
  let fixture: ComponentFixture<NarudzbenicaModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NarudzbenicaModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NarudzbenicaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
