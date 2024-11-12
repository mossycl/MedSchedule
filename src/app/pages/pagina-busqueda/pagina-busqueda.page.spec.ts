import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginaBusquedaPage } from './pagina-busqueda.page';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { PaginaBusquedaPageRoutingModule } from './pagina-busqueda-routing.module';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ActivatedRoute } from '@angular/router';

describe('PaginaBusquedaPage', () => {
  let component: PaginaBusquedaPage;
  let fixture: ComponentFixture<PaginaBusquedaPage>;
  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PaginaBusquedaPageRoutingModule,
        ComponentsModule
      ],
      declarations: [PaginaBusquedaPage],
      providers: [SQLite, NativeStorage, {provide: ActivatedRoute, useValue: fakeActivatedRoute}]
    })
    fixture = TestBed.createComponent(PaginaBusquedaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
