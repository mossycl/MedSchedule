import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientConfigPage } from './patient-config.page';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { PatientConfigPageRoutingModule } from './patient-config-routing.module';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('PatientConfigPage', () => {
  let component: PatientConfigPage;
  let fixture: ComponentFixture<PatientConfigPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PatientConfigPageRoutingModule,
        ComponentsModule
      ],
      declarations: [PatientConfigPage],
      providers : [SQLite, NativeStorage]
    })
    fixture = TestBed.createComponent(PatientConfigPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
