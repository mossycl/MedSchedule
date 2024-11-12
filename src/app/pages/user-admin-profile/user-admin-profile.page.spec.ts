import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserAdminProfilePage } from './user-admin-profile.page';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { UserAdminProfilePageRoutingModule } from './user-admin-profile-routing.module';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule } from '@ionic/angular';

describe('UserAdminProfilePage', () => {
  let component: UserAdminProfilePage;
  let fixture: ComponentFixture<UserAdminProfilePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        UserAdminProfilePageRoutingModule,
        ReactiveFormsModule,
        ComponentsModule
      ],
      declarations: [UserAdminProfilePage],
      providers : [NativeStorage, SQLite]
    })
    fixture = TestBed.createComponent(UserAdminProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
