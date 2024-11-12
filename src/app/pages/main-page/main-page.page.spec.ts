import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainPagePage } from './main-page.page';
import { CommonModule } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { FooterMenuComponent } from 'src/app/components/footer-menu/footer-menu.component';
import { MainPagePageRoutingModule } from './main-page-routing.module';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ActivatedRoute } from '@angular/router';

describe('MainPagePage', () => {
  let component: MainPagePage;
  let fixture: ComponentFixture<MainPagePage>;
  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MainPagePageRoutingModule,
        ComponentsModule
      ],
      declarations: [
        MainPagePage,
        FooterMenuComponent],
        providers : [{ provide : LOCALE_ID, useValue : 'es'}, 
          SQLite, NativeStorage, {provide: ActivatedRoute, useValue: fakeActivatedRoute}]
    })
    fixture = TestBed.createComponent(MainPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
