import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainPageMedicPage } from './main-page-medic.page';
import { CommonModule } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { MainPageMedicPageRoutingModule } from './main-page-medic-routing.module';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ActivatedRoute } from '@angular/router';

describe('MainPageMedicPage', () => {
  let component: MainPageMedicPage;
  let fixture: ComponentFixture<MainPageMedicPage>;
  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MainPageMedicPageRoutingModule,
        ComponentsModule
      ],
      declarations: [
        MainPageMedicPage
      ],
      providers : [{ provide : LOCALE_ID, useValue : 'es'}, SQLite, NativeStorage,{provide: ActivatedRoute, useValue: fakeActivatedRoute}]
    })
    fixture = TestBed.createComponent(MainPageMedicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
