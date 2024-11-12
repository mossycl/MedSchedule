import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageDbPage } from './manage-db.page';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { ManageDbPageRoutingModule } from './manage-db-routing.module';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('ManageDbPage', () => {
  let component: ManageDbPage;
  let fixture: ComponentFixture<ManageDbPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ManageDbPageRoutingModule,
        ComponentsModule
      ],
      declarations: [ManageDbPage],
      providers : [SQLite, NativeStorage,]
    })
    fixture = TestBed.createComponent(ManageDbPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
