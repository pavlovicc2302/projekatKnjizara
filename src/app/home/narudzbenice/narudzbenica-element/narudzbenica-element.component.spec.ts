import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NarudzbenicaElementComponent } from './narudzbenica-element.component';

describe('NarudzbenicaElementComponent', () => {
  let component: NarudzbenicaElementComponent;
  let fixture: ComponentFixture<NarudzbenicaElementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NarudzbenicaElementComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NarudzbenicaElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
