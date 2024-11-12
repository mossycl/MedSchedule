import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleHoursPage } from './schedule-hours.page';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { ScheduleHoursPageRoutingModule } from './schedule-hours-routing.module';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('ScheduleHoursPage', () => {
  let component: ScheduleHoursPage;
  let fixture: ComponentFixture<ScheduleHoursPage>;
  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ScheduleHoursPageRoutingModule,
        ComponentsModule
      ],
      declarations: [ScheduleHoursPage],
      providers : [SQLite, NativeStorage, {provide: ActivatedRoute, useValue: fakeActivatedRoute}]
    })
    fixture = TestBed.createComponent(ScheduleHoursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
