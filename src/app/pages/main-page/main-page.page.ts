import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Paciente } from 'src/app/classes/paciente';
import { User } from 'src/app/classes/user';
import { ObjectHandlerService } from 'src/app/services/object-handler.service';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.page.html',
  styleUrls: ['./main-page.page.scss'],
})
export class MainPagePage implements OnInit {
  date : number = Date.now();
  userLogged! : User;
  patientLogged! : Paciente;
  setHours : any = [];
  loadReady : boolean = false;
  hrsLoadReady : boolean = false;
  constructor(
    private storage : NativeStorage, 
    private handler : ObjectHandlerService, 
    private bd : ServicebdService) { 
    this.getuser();
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getuser()
  }

  ionViewDidLeave(){
    this.setHours = [];
  }


  async getSchedule(run : number){
    // resolver conflicto de lista
    console.log("DFO: Obteniendo citas medicas")
    await this.bd.getScheduledHrs(run, 1)
    .then(async () =>{
      await this.storage.getItem('activeSchedule')
      .then((data) =>{
        let activeSchedule = Object.values(data);
        this.setHours = activeSchedule;
        console.log('DFO: Lista de horas creada')
      }).catch(e => console.log('DFO: Fetch de horas medicas fallo: '+ JSON.stringify(e)))
    })
  }
  async getuser(){
    await this.storage.getItem('userLogged').then(async (data) => {
      this.userLogged = this.handler.createUserObject(data);
      await this.storage.getItem('patientLogged')
        .then(async (data) => {
          console.log('DFO: paciente encontrado');
          this.patientLogged = this.handler.createPatientObject(JSON.parse(data))
          await this.getSchedule(this.patientLogged.numrunPaciente)
          this.loadReady = true;
          console.log('DFO: paciente listo'+ this.loadReady);
          })
        })
    }
  }
