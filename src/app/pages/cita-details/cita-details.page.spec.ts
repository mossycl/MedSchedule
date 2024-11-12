import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CitaDetailsPage } from './cita-details.page';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { CitaDetailsPageRoutingModule } from './cita-details-routing.module';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('CitaDetailsPage', () => {
  let component: CitaDetailsPage;
  let fixture: ComponentFixture<CitaDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CitaDetailsPageRoutingModule,
        ComponentsModule
      ],
      declarations: [CitaDetailsPage],
      providers : [NativeStorage, SQLite]
    })
    fixture = TestBed.createComponent(CitaDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
