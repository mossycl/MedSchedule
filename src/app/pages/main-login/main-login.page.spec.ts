import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainLoginPage } from './main-login.page';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonRouterOutlet, Platform } from '@ionic/angular';
import { MainLoginPageRoutingModule } from './main-login-routing.module';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ActivatedRoute } from '@angular/router';

describe('MainLoginPage', () => {
  let component: MainLoginPage;
  let fixture: ComponentFixture<MainLoginPage>;
  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MainLoginPageRoutingModule,
        ReactiveFormsModule
      ],
      declarations: [MainLoginPage],
      providers : [SQLite, NativeStorage, Platform, {provide: IonRouterOutlet, useValue : {}}]
    })
    fixture = TestBed.createComponent(MainLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
