import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserMedicProfilePage } from './user-medic-profile.page';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserMedicProfilePageRoutingModule } from './user-medic-profile-routing.module';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('UserMedicProfilePage', () => {
  let component: UserMedicProfilePage;
  let fixture: ComponentFixture<UserMedicProfilePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        UserMedicProfilePageRoutingModule,
        ReactiveFormsModule
      ],
      declarations: [UserMedicProfilePage],
      providers : [SQLite, NativeStorage]
  });
    fixture = TestBed.createComponent(UserMedicProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
