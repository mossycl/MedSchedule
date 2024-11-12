import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewMedicAccountPage } from './new-medic-account.page';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { NewMedicAccountPageRoutingModule } from './new-medic-account-routing.module';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('NewMedicAccountPage', () => {
  let component: NewMedicAccountPage;
  let fixture: ComponentFixture<NewMedicAccountPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        NewMedicAccountPageRoutingModule,
        ComponentsModule,
        ReactiveFormsModule
      ],
      declarations: [NewMedicAccountPage],
      providers : [SQLite, NativeStorage]
    })
    fixture = TestBed.createComponent(NewMedicAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
