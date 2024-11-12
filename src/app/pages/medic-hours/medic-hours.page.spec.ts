import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicHoursPage } from './medic-hours.page';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { MedicHoursPageRoutingModule } from './medic-hours-routing.module';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { provideHttpClient } from '@angular/common/http';

describe('MedicHoursPage', () => {
  let component: MedicHoursPage;
  let fixture: ComponentFixture<MedicHoursPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MedicHoursPageRoutingModule,
        ComponentsModule
      ],
      declarations: [MedicHoursPage],
      providers: [SQLite, NativeStorage,provideHttpClient()]
    })
    fixture = TestBed.createComponent(MedicHoursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
