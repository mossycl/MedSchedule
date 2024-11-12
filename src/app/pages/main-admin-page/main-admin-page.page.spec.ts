import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainAdminPagePage } from './main-admin-page.page';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { MainAdminPagePageRoutingModule } from './main-admin-page-routing.module';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ActivatedRoute } from '@angular/router';

describe('MainAdminPagePage', () => {
  let component: MainAdminPagePage;
  let fixture: ComponentFixture<MainAdminPagePage>;
  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MainAdminPagePageRoutingModule,
        ComponentsModule
      ],
      declarations: [MainAdminPagePage],
      providers : [SQLite, NativeStorage, {provide : ActivatedRoute, useValue : fakeActivatedRoute}]
    })
    fixture = TestBed.createComponent(MainAdminPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
