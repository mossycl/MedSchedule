import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarioPage } from './calendario.page';
import { CommonModule } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { CalendarioPageRoutingModule } from './calendario-routing.module';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

describe('CalendarioPage', () => {
  let component: CalendarioPage;
  let fixture: ComponentFixture<CalendarioPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CalendarioPageRoutingModule,
        ComponentsModule
      ],
      declarations: [CalendarioPage],
      providers : [{ provide : LOCALE_ID, useValue : 'es'}, {provide: SQLite}, NativeStorage]
    })
    fixture = TestBed.createComponent(CalendarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
