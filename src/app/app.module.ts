import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { provideHttpClient } from '@angular/common/http';
import { SplashScreen } from '@capacitor/splash-screen';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule, IonicModule.forRoot({swipeBackEnabled: false})],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideAnimationsAsync(), NativeStorage, SQLite, provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    this.showSplash();
  }
  async showSplash(){
    await SplashScreen.show({
      autoHide: true,
      showDuration: 3000
    });
  }
}
