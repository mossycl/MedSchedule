import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BtnRouterComponent } from './btn-router.component';
import { ActivatedRoute, provideRouter } from '@angular/router';

describe('BtnRouterComponent', () => {
  let component: BtnRouterComponent;
  let fixture: ComponentFixture<BtnRouterComponent>;
  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnRouterComponent ],
      imports: [IonicModule.forRoot()],
      providers : [{provide: ActivatedRoute, useValue: fakeActivatedRoute}]
    }).compileComponents();

    fixture = TestBed.createComponent(BtnRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
