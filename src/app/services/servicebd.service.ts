import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlerttoastService } from './alerttoast.service';
import { EncoderService } from './encoder.service';
import { CitaMedica } from '../classes/cita-medica';
import { Paciente } from '../classes/paciente';
import { Medic } from '../classes/medic';
import { TodayDateService } from './today-date.service';
import { Especialidad } from '../classes/especialidad';
import { User } from '../classes/user';
import { AlertService } from './alert.service';


@Injectable({
  providedIn: 'root'
})
export class ServicebdService {
  public database! : SQLiteObject;
  bulkQuery : any = [
    "CREATE TABLE IF NOT EXISTS especialidad (id_esp INTEGER PRIMARY KEY AUTOINCREMENT, nom_esp VARCHAR(30) NOT NULL);",
"CREATE TABLE IF NOT EXISTS role (id_role INTEGER PRIMARY KEY AUTOINCREMENT, role_name VARCHAR(15) NOT NULL);",
"CREATE TABLE IF NOT EXISTS trimestre (id_trimestre INTEGER PRIMARY KEY AUTOINCREMENT, nom_trimestre VARCHAR(10) NOT NULL);",
"CREATE TABLE IF NOT EXISTS estado_cita (id_estado INTEGER PRIMARY KEY AUTOINCREMENT, nom_estado VARCHAR(10) NOT NULL);",
"CREATE TABLE IF NOT EXISTS log_type (id_type INTEGER PRIMARY KEY AUTOINCREMENT, desc_type VARCHAR(50) NOT NULL);",
"CREATE TABLE IF NOT EXISTS user (id_user INTEGER PRIMARY KEY AUTOINCREMENT, email VARCHAR(50) UNIQUE NOT NULL, pw VARCHAR(100) NOT NULL, active INTEGER CHECK(active IN (0,1)), foto_perfil BLOB, id_role INTEGER NOT NULL, FOREIGN KEY(id_role) REFERENCES role(id_role));",
"CREATE TABLE IF NOT EXISTS log (id_log INTEGER PRIMARY KEY AUTOINCREMENT, anno_log INTEGER NOT NULL, mes_log INTEGER NOT NULL, dia_log INTEGER NOT NULL, hora_log VARCHAR(10) NOT NULL, id_user INTEGER NOT NULL, id_type INTEGER NOT NULL, FOREIGN KEY(id_user) REFERENCES user(id_user), FOREIGN KEY(id_type) REFERENCES log_type(id_type));",
"CREATE TABLE IF NOT EXISTS medico (numrun_medico INTEGER PRIMARY KEY, dvrun_medico VARCHAR(1) NOT NULL, pnombre_medico VARCHAR(50) NOT NULL, snombre_medico VARCHAR(50) NOT NULL, apaterno_medico VARCHAR(50) NOT NULL, amaterno_medico VARCHAR(50) NOT NULL, tel_medico INTEGER NOT NULL, box_medico VARCHAR(50) NOT NULL, tiempo_bloque INTEGER NOT NULL, id_esp INTEGER NOT NULL, id_user INTEGER NOT NULL, FOREIGN KEY(id_esp) REFERENCES especialidad(id_esp), FOREIGN KEY(id_user) REFERENCES user(id_user));",
"CREATE TABLE IF NOT EXISTS paciente (numrun_paciente INTEGER PRIMARY KEY, dvrun_paciente VARCHAR(1) NOT NULL, pnombre_paciente VARCHAR(50) NOT NULL, snombre_paciente VARCHAR(50) NOT NULL, apaterno_paciente VARCHAR(50) NOT NULL, amaterno_paciente VARCHAR(50) NOT NULL, tel_paciente INTEGER NOT NULL, id_user INTEGER NOT NULL, FOREIGN KEY(id_user) REFERENCES user(id_user));",
"CREATE TABLE IF NOT EXISTS cita_medica (id_cita INTEGER PRIMARY KEY AUTOINCREMENT, anno_cita INTEGER NOT NULL, mes_cita INTEGER NOT NULL, dia_cita INTEGER NOT NULL, hora_cita VARCHAR(5) NOT NULL, id_estado INTEGER NOT NULL, numrun_paciente INTEGER NOT NULL, numrun_medico INTEGER NOT NULL, FOREIGN KEY(id_estado) REFERENCES estado_cita(id_estado), FOREIGN KEY(numrun_paciente) REFERENCES paciente(numrun_paciente), FOREIGN KEY(numrun_medico) REFERENCES medico(numrun_medico));",
"CREATE TABLE IF NOT EXISTS mes (id_mes INTEGER PRIMARY KEY AUTOINCREMENT, nom_mes VARCHAR(12) NOT NULL, id_trimestre INTEGER NOT NULL, FOREIGN KEY(id_trimestre) REFERENCES trimestre(id_trimestre));",
"CREATE TABLE IF NOT EXISTS anno (id_anno INTEGER PRIMARY KEY AUTOINCREMENT, anno INTEGER NOT NULL, id_trimestre INTEGER NOT NULL, active INTEGER CHECK(active in (0,1)), FOREIGN KEY(id_trimestre) REFERENCES trimestre(id_trimestre));",
"CREATE TABLE IF NOT EXISTS agenda_medica (id_agenda INTEGER PRIMARY KEY AUTOINCREMENT, mes_agenda INTEGER NOT NULL, dia_agenda INTEGER NOT NULL, hora_inicio VARCHAR(5) NOT NULL, hora_termino VARCHAR(5), numrun_medico INTEGER NOT NULL, id_anno INTEGER NOT NULL, FOREIGN KEY(numrun_medico) REFERENCES medico(numrun_medico), FOREIGN KEY(id_anno) REFERENCES anno(id_anno));",
"INSERT OR IGNORE INTO especialidad(id_esp, nom_esp) VALUES(1, 'Medicina General');",
"INSERT OR IGNORE INTO especialidad(id_esp, nom_esp) VALUES(2, 'Kinesiología');",
"INSERT OR IGNORE INTO especialidad(id_esp, nom_esp) VALUES(3, 'Broncopulmonar');",
"INSERT OR IGNORE INTO especialidad(id_esp, nom_esp) VALUES(4, 'Traumatología');",
"INSERT OR IGNORE INTO especialidad(id_esp, nom_esp) VALUES(5, 'Cardiología');",
"INSERT OR IGNORE INTO especialidad(id_esp, nom_esp) VALUES(6, 'Oncología');",
"INSERT OR IGNORE INTO especialidad(id_esp, nom_esp) VALUES(7, 'Otorrinolaringología');",
"INSERT OR IGNORE INTO role(id_role, role_name) VALUES(1, 'Paciente');",
"INSERT OR IGNORE INTO role(id_role, role_name) VALUES(2, 'Médico');",
"INSERT OR IGNORE INTO role(id_role, role_name) VALUES(3, 'Admin');",
"INSERT OR IGNORE INTO estado_cita(id_estado, nom_estado) VALUES(1, 'Activo');",
"INSERT OR IGNORE INTO estado_cita(id_estado, nom_estado) VALUES(2, 'Cancelado');",
"INSERT OR IGNORE INTO estado_cita(id_estado, nom_estado) VALUES(3, 'Finalizado');",
"INSERT OR IGNORE INTO trimestre(id_trimestre, nom_trimestre) VALUES(1, 'Primer');",
"INSERT OR IGNORE INTO trimestre(id_trimestre, nom_trimestre) VALUES(2, 'Segundo');",
"INSERT OR IGNORE INTO trimestre(id_trimestre, nom_trimestre) VALUES(3, 'Tercer');",
"INSERT OR IGNORE INTO trimestre(id_trimestre, nom_trimestre) VALUES(4, 'Cuarto');",
"INSERT OR IGNORE INTO mes(id_mes, nom_mes, id_trimestre) VALUES(1,'Enero',1);",
"INSERT OR IGNORE INTO mes(id_mes, nom_mes, id_trimestre) VALUES(2,'Febrero',1);",
"INSERT OR IGNORE INTO mes(id_mes, nom_mes, id_trimestre) VALUES(3,'Marzo',1);",
"INSERT OR IGNORE INTO mes(id_mes, nom_mes, id_trimestre) VALUES(4,'Abril',2);",
"INSERT OR IGNORE INTO mes(id_mes, nom_mes, id_trimestre) VALUES(5,'Mayo',2);",
"INSERT OR IGNORE INTO mes(id_mes, nom_mes, id_trimestre) VALUES(6,'Junio',2);",
"INSERT OR IGNORE INTO mes(id_mes, nom_mes, id_trimestre) VALUES(7,'Julio',3);",
"INSERT OR IGNORE INTO mes(id_mes, nom_mes, id_trimestre) VALUES(8,'Agosto',3);",
"INSERT OR IGNORE INTO mes(id_mes, nom_mes, id_trimestre) VALUES(9,'Septiembre',3);",
"INSERT OR IGNORE INTO mes(id_mes, nom_mes, id_trimestre) VALUES(10,'Octubre',4);",
"INSERT OR IGNORE INTO mes(id_mes, nom_mes, id_trimestre) VALUES(11,'Noviembre',4);",
"INSERT OR IGNORE INTO mes(id_mes, nom_mes, id_trimestre) VALUES(12,'Diciembre',4);",
"INSERT OR IGNORE INTO log_type(id_type, desc_type) VALUES(1, 'Registro de Usuario');",
"INSERT OR IGNORE INTO log_type(id_type, desc_type) VALUES(2, 'Login Usuario');",
"INSERT OR IGNORE INTO log_type(id_type, desc_type) VALUES(3, 'Nueva cita médica');",
"INSERT OR IGNORE INTO log_type(id_type, desc_type) VALUES(4, 'Cancela Cita médica');",
"INSERT OR IGNORE INTO log_type(id_type, desc_type) VALUES(5, 'Nueva agenda médica');",
"INSERT OR IGNORE INTO log_type(id_type, desc_type) VALUES(6, 'Modifica agenda médica');",
"INSERT OR IGNORE INTO log_type(id_type, desc_type) VALUES(7, 'Logout Usuario');",
"INSERT OR IGNORE INTO anno(id_anno, anno, id_trimestre, active) VALUES(1,2024,4,1);",
"INSERT OR IGNORE INTO user(email, pw, active, foto_perfil, id_role) VALUES('d.fernoliva@gmail.com', 'contrasena2024', 1, NULL, 2);",
"INSERT OR IGNORE INTO user(email, pw, active, foto_perfil, id_role) VALUES('p.troncoso@gmail.com', 'troncoso2024',1, NULL, 2);",
"INSERT OR IGNORE INTO user(email, pw, active, foto_perfil, id_role) VALUES('a.troncoso@gmail.com', 'adolfo2024', 1, NULL, 2);",
"INSERT OR IGNORE INTO user(email, pw, active, foto_perfil, id_role) VALUES('cri.bahamondes@gmail.com', 'christopher2024', 1, NULL, 2);",
"INSERT OR IGNORE INTO medico(numrun_medico, dvrun_medico, pnombre_medico, snombre_medico, apaterno_medico, amaterno_medico, tel_medico, box_medico, tiempo_bloque, id_esp, id_user) VALUES(18007012,'5','Diego','Andres','Fernandez','Oliva',981744765,'Box 1',30,1,1)",
"INSERT OR IGNORE INTO medico(numrun_medico, dvrun_medico, pnombre_medico, snombre_medico, apaterno_medico, amaterno_medico, tel_medico, box_medico, tiempo_bloque, id_esp, id_user) VALUES(18456789,'k','Pablo','Rodrigo','Troncoso','Ortega',981744765,'Box 2',30,2,2)",
"INSERT OR IGNORE INTO medico(numrun_medico, dvrun_medico, pnombre_medico, snombre_medico, apaterno_medico, amaterno_medico, tel_medico, box_medico, tiempo_bloque, id_esp, id_user) VALUES(21546789,'0','Adolfo','Roberto','Troncoso','Ortega',981744765,'Box 3',30,3,3)",
"INSERT OR IGNORE INTO medico(numrun_medico, dvrun_medico, pnombre_medico, snombre_medico, apaterno_medico, amaterno_medico, tel_medico, box_medico, tiempo_bloque, id_esp, id_user) VALUES(19321556,'2','Christopher','Cristobal','Bahamondes','Vargas',981744765,'Box 4',30,4,4)",
"INSERT OR IGNORE INTO user(email, pw, active, foto_perfil, id_role) VALUES('admin@admin.com','admin654321',1,'',3);"
  ]

  queryInsertDefaults : any;
  insertsReady : boolean = false;
  // creacion de tablas
  private isDBReady : BehaviorSubject<boolean> = new BehaviorSubject(false);
  private isLoginValid : BehaviorSubject<boolean> = new BehaviorSubject(false);
  dbReady$ = this.isDBReady.asObservable();
  loginValid$ = this.isLoginValid.asObservable();
  private gotId! : number;

  constructor(private sqlite : SQLite, 
    private platform : Platform, 
    private storage : NativeStorage,
    private toast : AlerttoastService,
    private ec : EncoderService,
    private today : TodayDateService,
    private alert : AlertService) {
      this.createDB();
  }
  createDB(){
    this.platform.ready().then(()=>{
      this.sqlite.create({
        name: 'medschdb.db',
        location: 'default'
      }).then((db: SQLiteObject) =>{
        this.database = db;
        this.toast.presentToast('DFO: BD creada')
        this.createTablesByBulk();
      }).catch((e: string) => this.toast.presentToast('Error al crear base de datos: '+ JSON.stringify(e), 500));
    })
  }
  async createTablesByBulk(){
    for(let i = 0; i<this.bulkQuery.length; i++){
      let query = this.bulkQuery[i];
      await this.database.executeSql(query,[])
      .then(async () => {
        //console.log('DFO: insertando: '+ query)
      }).catch(e => console.log('DFO: Fallo el query: ',JSON.stringify(e)))
    }
    this.isDBReady.next(true);
  }

  getUser(email : string, pw : string){
    let response = {};
    //let isValid = false;
    let query = "SELECT * FROM user WHERE email='"+ email + "' AND  pw='"+ pw + "';";
    return this.database.executeSql(query,[])
    .then((res) => {
      ///console.log('Query passed. Length: '+res.rows.length);
      if (res.rows.length>0){
        //console.log('DFO: Usuario encontrado')
        //console.log("idUser: " +res.rows.item(0).id_user);
        response = {
          idUser : res.rows.item(0).id_user,
          email : res.rows.item(0).email,
          active : res.rows.item(0).active,
          fotoPerfil : res.rows.item(0).foto_perfil,
          idRole : res.rows.item(0).id_role
        }
        
        //isValid = true;
        this.storage.setItem("userLogged", response);
        this.isLoginValid.next(true);
      }
    }).catch((e) => {
      this.toast.presentToast('Error al cargar usuario: '+ JSON.stringify(e))
    });
  }

  getMedic(idUser : number){
    // metodo que obtiene los datos del medico cuando este se loguea
    // solo se usa si el medico es quien se loguea
    let response = {};
    let query = "SELECT * FROM medico WHERE id_user ='"+ idUser + "';";
    return this.database.executeSql(query,[])
    .then((res) =>{
      if (res.rows.length>0){
        console.log("DFO: medico existe");
        response = {
          numrunMedico : res.rows.item(0).numrun_medico,
          dvRunMedico : res.rows.item(0).dvrun_medico,
          pnombreMedico : this.ec.convertStringUTF8(res.rows.item(0).pnombre_medico),
          snombreMedico : this.ec.convertStringUTF8(res.rows.item(0).snombre_medico),
          apaternoMedico : this.ec.convertStringUTF8(res.rows.item(0).apaterno_medico),
          amaternoMedico : this.ec.convertStringUTF8(res.rows.item(0).amaterno_medico),
          telMedico : res.rows.item(0).tel_medico,
          boxMedico : this.ec.convertStringUTF8(res.rows.item(0).box_medico),
          tiempoBloque : res.rows.item(0).tiempo_bloque,
          idEsp : res.rows.item(0).id_esp,
          idUser : idUser
        }
        this.storage.setItem('medicLogged', JSON.stringify(response))
      }else {
        console.log("DFO bd: Medico no existe")
      }
      //return this.handler.createMedicObject(response);
    })
  }

  async createUser(obj : object){
    console.log('creando usuario');
    const values = Object.values(obj);
    // vamos a hacer otra aproximación
    // los valores son 0 pnombre, 1 snombre, 2 apaterno, 3 amaterno, 4 run, 5 email, 6 phone, 7 pw, 8 pw2 (no se usa aca)
    let userObj = {
      email : values[5],
      pw : values[7],
      active : 1,
      fotoPerfil : "",
      idRole : 1
    }
    const rut = values[4] as string;
    const splitRun = rut.split('-');

    let patObj = {
      numrun : parseInt(splitRun[0]),
      dvrun : splitRun[1],
      pnombre : this.ec.convertStringISO(values[0]),
      snombre : this.ec.convertStringISO(values[1]),
      apaterno : this.ec.convertStringISO(values[2]),
      amaterno : this.ec.convertStringISO(values[3]),
      tel : values[6],
    }

    const query1 = 'INSERT INTO user(email, pw, active, foto_perfil, id_role) VALUES(?,?,?,?,?);'
    await this.database.executeSql(query1,[userObj.email,userObj.pw,userObj.active,userObj.fotoPerfil,userObj.idRole])
    .then(async () =>{
      console.log('DFO: Usuario registrado');
      await this.getIdUserPatient(userObj.email)
      .then(async () =>{
        //console.log('DFO: Obteniendo ID')
        if (this.gotId>0){
          this.insertLog(this.gotId,1);
          await this.createPatient(patObj, this.gotId)
          .then( () =>{
            this.alert.alertNavigation('/main-login','Registro con éxito','Recibirá un correo para confirmar su registro')
          })
        }
      })
    }).catch((e) => {
      console.log('Error al registrar Usuario: '+ JSON.stringify(e))
    });
  }

  async getIdUserPatient(email : string){
    // si el ID es -1 significa que no encontró el usuario
    //let query = "SELECT id_user FROM user WHERE email='" + email + "';";
    let id : number;
    await this.database.executeSql("SELECT id_user FROM user WHERE email='"+email+"';",[])
    .then((res) => {
      if (res.rows.length>0){
        console.log("DFO: obtuvo el id " + res.rows.item(0).id_user)
        id = res.rows.item(0).id_user;
        this.gotId = id;
      } else {
        id = -1;
        this.gotId = id
      }
    }).catch((e) => {
      this.toast.presentToast('Error obteniendo ID: '+ JSON.stringify(e))
      id = -1
      this.gotId = id
    });
  }

  async createPatient(obj : object, id : any) {
    // debe recibir el ID de otra función
    console.log('DFO: creando paciente')
    const values = Object.values(obj);
    let numrun = values[0];
    let dvrun = values[1];
    let pnombre = this.ec.convertStringISO(values[2]);
    let snombre = this.ec.convertStringISO(values[3]);
    let apaterno = this.ec.convertStringISO(values[4]);
    let amaterno = this.ec.convertStringISO(values[5]);
    let tel = values[6];
    let idUser = id;
    const query = 'INSERT INTO paciente(numrun_paciente, dvrun_paciente, pnombre_paciente, snombre_paciente, apaterno_paciente, amaterno_paciente, tel_paciente, id_user) '+
    'VALUES(?,?,?,?,?,?,?,?)';
    await this.database.executeSql(query,[numrun,dvrun, pnombre, snombre, apaterno, amaterno, tel, idUser])
    .then(()=>{
      console.log('DFO : paciente creado')
      return true
    }).catch((e) => {
      this.toast.presentToast('Error al insertar Paciente: '+ JSON.stringify(e));
      return false;
    })
  };

  getPaciente(idUser : number){
    let response = {};
    let query = "SELECT * FROM paciente WHERE id_user ='"+ idUser + "';";
    return this.database.executeSql(query,[])
    .then((res) => {
      if(res.rows.length>0){
        console.log('DFO: paciente existe');
        response = {
          numrun : res.rows.item(0).numrun_paciente,
          dvrun : res.rows.item(0).dvrun_paciente,
          pnombre : this.ec.convertStringUTF8(res.rows.item(0).pnombre_paciente),
          snombre : this.ec.convertStringUTF8(res.rows.item(0).snombre_paciente),
          apaterno : this.ec.convertStringUTF8(res.rows.item(0).apaterno_paciente),
          amaterno : this.ec.convertStringUTF8(res.rows.item(0).amaterno_paciente),
          tel : res.rows.item(0).tel_paciente,
          id : idUser
        }
        this.storage.setItem('patientLogged', JSON.stringify(response));
      } else {
        console.log('DFO: getPaciente paciente no existe')
      }
    })
  }

  getScheduledHrs(numrunPaciente : number, estado : number){
    // entrega todas las citas medicas del paciente dependiendo de su estado
    // en este caso debería entregarlas solo si esta activo
    // aunque puede entregarsele cualquier parámetro
    const query = "SELECT cita.id_cita AS id, cita.dia_cita AS dia, cita.mes_cita AS mes, cita.anno_cita AS anno, cita.hora_cita AS hora, cita.id_estado, med.pnombre_medico||' '||med.apaterno_medico||' '||med.amaterno_medico as nombre_medico FROM cita_medica cita JOIN medico med ON cita.numrun_medico = med.numrun_medico WHERE numrun_paciente="+numrunPaciente+" AND id_estado="+ estado +";";
    let response = []
    return this.database.executeSql(query,[])
    .then((res) =>{
      if (res.rows.length>0){
        for (let i=0; i< res.rows.length; i++){
          let horaStr = res.rows.item(i).hora as string;
          let scheduleHr = {
            idCita : res.rows.item(i).id,
            fecha : res.rows.item(i).dia + "/"+ res.rows.item(i).mes+"/"+res.rows.item(i).anno,
            hora : horaStr.substring(0,5),
            estado : res.rows.item(i).id_estado,
            nombreMedico : res.rows.item(i).nombre_medico
          }
          //console.log('DFO: hora '+scheduleHr.hora)
          response.push(scheduleHr);
          ///console.log('DFO: Hay citas')
        }
        } else {
        console.log('DFO: No hay citas')
      }
      this.storage.setItem('activeSchedule',response)
      //return response
    }).catch(e => console.log('DFO: Error obteniendo lista: '+ JSON.stringify(e)))
  }

  getSpecialities() : Observable<any>{
    let response = [];
    return new Observable(observer => {
      this.database.executeSql('SELECT * FROM especialidad;',[])
      .then((res) =>{
        if(res.rows.length>0){
          for(let i = 0;i<res.rows.length;i++){
            let esp = new Especialidad(
              res.rows.item(i).id_esp, 
              res.rows.item(i).nom_esp)
            response.push(esp);
          }
        }
        observer.next(response)
        observer.complete()
      }).catch(e => console.log('DFO: error obteniendo especialidades '+JSON.stringify(e)))
    })
  }

  getAllMedics(){
    console.log('DFO: obteniendo medicos')
    let response = [];
    return this.database.executeSql("SELECT med.numrun_medico AS numrun, med.dvrun_medico AS dv, med.pnombre_medico||' '||med.apaterno_medico||' '||med.amaterno_medico AS nombre, med.id_esp AS id_esp, esp.nom_esp AS especialidad, med.tiempo_bloque as tiempo_bloque, med.box_medico as box_medico FROM medico med JOIN especialidad esp ON med.id_esp = esp.id_esp WHERE med.id_esp = esp.id_esp;",[])
    .then((res) => {
      if (res.rows.length>0){
        console.log('DFO: Query Passed :'+ res.rows.length)
        for (let i = 0; i<res.rows.length; i++){
          console.log('DFO: '+res.rows.item(i).nombre)
          let medico = {
            numrunMedico : res.rows.item(i).numrun,
            dvrunMedico : res.rows.item(i).dv,
            nombreMedico : res.rows.item(i).nombre,
            idEsp : res.rows.item(i).id_esp,
            especialidad : this.ec.convertStringUTF8(res.rows.item(i).especialidad),
            tiempoBloque : res.rows.item(i).tiempo_bloque,
            boxMedico : res.rows.item(i).box_medico
          }
          response.push(medico);
        }
        // puedo deshacerme de este metodo, pero debo asegurarme de que ya no sea usado en la pagina
        // o cambiar por un observable
        this.storage.setItem('medicos',response)
      }
      //return response;
    }).catch(e => console.log('DFO: Error obteniendo lista de medicos :', JSON.stringify(e)));
  }

  getMesesFromTrimestre(idTrimestre : number) : Observable<Array<number>> {
    // devuelve una lista de meses
    let mesList : Array<number> = []
    return new Observable(observer => {
      this.database.executeSql('SELECT id_mes FROM mes WHERE id_trimestre=? ;',[idTrimestre])
      .then((res) => {
        if(res.rows.length>0){
          for (let i = 0;i<res.rows.length;i++){
            mesList.push(res.rows.item(i).id_mes);
          }
          observer.next(mesList);
          observer.complete();
        }
      })
    }) 
    
  }
  /// METODOS RELACIONADOS A agenda_medica
  getAnoTrimestre(){
    console.log('DFO: bd.getAnoTrimestre');
    let meses: Array<number> = []
    return this.database.executeSql('SELECT a.id_anno AS id, a.anno AS anno, a.id_trimestre AS id_trimestre, m.id_mes AS mes FROM anno a LEFT JOIN mes m ON a.id_trimestre = m.id_trimestre WHERE m.id_trimestre = a.id_trimestre AND a.active = 1',[])
    .then(res => {
      if (res.rows.length>0){
        for (let i= 0; i<res.rows.length;i++){
          let mes = res.rows.item(i).mes;
          meses.push(mes);
        }
        let obj = {
          idAnno : res.rows.item(0).id,
          anno : res.rows.item(0).anno,
          idTrimestre : res.rows.item(0).id_trimestre,
          meses : meses
        }
        this.storage.setItem('annoTrimestre',obj);
      }
    }).catch(e => console.log('DFO: Error al capturar AñoTrimestre: '+JSON.stringify(e)))
  }

  getAgenda(numrun : number, idAnno : number){
    let response = []
    let obj = {
      mes : 0,
      dia : 0,
      horaInicio : "",
      horaTermino : "",
      numrunMedico : 0,
      idAnno : 0
    }
    return this.database.executeSql('SELECT * FROM agenda_medica WHERE numrun_medico=? AND id_anno=?;',[numrun, idAnno])
    .then((res) => {
      if(res.rows.length>0) {
        console.log('DFO: agendas encontradas')
        for(let i=0; i<res.rows.length;i++){
          obj = {
            mes : res.rows.item(i).mes_agenda,
            dia : res.rows.item(i).dia_agenda,
            horaInicio : res.rows.item(i).hora_inicio,
            horaTermino : res.rows.item(i).hora_termino,
            numrunMedico : res.rows.item(i).numrun_medico,
            idAnno : res.rows.item(i).id_anno
          }
          console.log('DFO: empujando '+res.rows.item(i).dia_agenda )
          response.push(obj);
        }
        //console.log()
        this.storage.setItem('agendaLista',response);
      }
    })

  }
  getAgendaWithYear(numrun : number, year : number){
    let response = []
    let obj = {
      mes : 0,
      dia : 0,
      horaInicio : "",
      horaTermino : "",
      numrunMedico : 0,
      idAnno : 0
    }
    return this.database.executeSql('SELECT am.mes_agenda AS mes_agenda, am.dia_agenda AS dia_agenda, am.hora_inicio AS hora_inicio, am.hora_termino AS hora_termino, am.numrun_medico AS numrun_medico, am.id_anno AS id_anno FROM agenda_medica am JOIN anno y ON am.id_anno = y.id_anno WHERE am.numrun_medico=? AND y.anno=? ;',[numrun, year])
    .then((res) => {
      if(res.rows.length>0) {
        //console.log('DFO: agendas encontradas')
        for(let i=0; i<res.rows.length;i++){
        //console.log('DFO: getAgendaWithYear mes '+res.rows.item(i).mes_agenda+' dia '+ res.rows.item(i).dia_agenda +' horaI '+res.rows.item(i).hora_inicio+' horaT '+ res.rows.item(i).hora_termino);
          obj = {
            mes : res.rows.item(i).mes_agenda,
            dia : res.rows.item(i).dia_agenda,
            horaInicio : res.rows.item(i).hora_inicio,
            horaTermino : res.rows.item(i).hora_termino,
            numrunMedico : res.rows.item(i).numrun_medico,
            idAnno : res.rows.item(i).id_anno
          }
          //console.log('DFO: empujando '+res.rows.item(i).mes_agenda)
          response.push(obj);
        }
        //console.log()
        this.storage.setItem('agenda'+numrun,response);
      }
    })
  }

  testingNewAgenda(lista : Array<object>){
    console.log('DFO PROBANDO LISTAS')
    for(let agenda of lista){
      let val = Object.values(agenda);
      console.log('DFO: mes: '+val[0]+' dia '+val[1]+' horaI '+val[2]+' horaT '+val[3])
    }
  }
  
  insertNewAgenda(lista : Array<object>){
    console.log('DFO: guardando agenda');
    let exists : boolean;
    for(let i = 0; i<lista.length; i++){
      let values = Object.values(lista[i]);
      console.log('DFO: mes: '+values[0]+' dia '+values[1]+' horaI '+values[2]+' horaT '+values[3]+' idx: '+i);
      //console.log('DFO: dia_mes '+values)
      this.database.executeSql('SELECT * FROM agenda_medica WHERE mes_agenda=? AND dia_agenda=? AND hora_inicio=? AND hora_termino=? AND numrun_medico=? AND id_anno=?',[values[0],values[1],values[2],values[3],values[4],values[5]])
      .then((res) =>{
        if(res.rows.length>0){
          exists = true
          console.log('DFO agenda existe')
          //console.log('DFO UPDATE datos '+values[0]+ ' '+values[1] + ' '+' '+values[2] + ' '+' '+values[3] + ' '+' '+values[4] + ' '+ values[5])
          return this.database.executeSql('UPDATE agenda_medica SET mes_agenda=?, dia_agenda=?, hora_inicio=?, hora_termino=? WHERE numrun_medico=? AND id_anno=? ;',
            [values[0],values[1],values[2],values[3],values[4],values[5]])
            .then(() => {
              this.toast.presentToast('Agenda actualizada '+ i)
            }).catch ((e) => this.toast.presentToast('Ha ocurrido un error al enviar la agenda. '+JSON.stringify(e)));
        } else {
          console.log('DFO:  agenda no existe')
          //console.log('DFO INSERT datos '+values[0]+ ' '+values[1] + ' '+' '+values[2] + ' '+' '+values[3] + ' '+' '+values[4] + ' '+ values[5])
          exists = false
          return this.database.executeSql('INSERT INTO agenda_medica(mes_agenda, dia_agenda, hora_inicio, hora_termino, numrun_medico, id_anno) VALUES(?, ?, ?, ?, ?, ?)',
            [values[0],values[1],values[2],values[3],values[4],values[5]])
            .then(() => {
              this.toast.presentToast('Agenda agregada '+ i)
            }).catch ((e) => this.toast.presentToast('Ha ocurrido un error al enviar la agenda. '+JSON.stringify(e)));
        }
      }).catch(e => console.log('DFO: error consultando tabla '+JSON.stringify(e)))
    }
  }

  getCitasMedicasMedico(numrun : number){
    /// entrega todas las citas médicas del doctor si estan activas
    // OJO: no entrega los pacientes a los que pertenece
    // solo entrega si estan activas
    // podria agregar un parametro con el estado, asi podria solicitar cualquiera
    let response = [];
    let obj : CitaMedica;
    return this.database.executeSql('SELECT * FROM cita_medica WHERE numrun_medico=? and id_estado=1 ;',[numrun])
    .then((res) =>{
      if(res.rows.length>0){
        console.log('DFO: citas encontradas');
        for(let i = 0; i<res.rows.length;i++){
          obj = new CitaMedica(res.rows.item(i).mes_cita, res.rows.item(i).dia_cita, res.rows.item(i).anno_cita, res.rows.item(i).hora_cita)
          response.push(obj);
        }
        this.storage.setItem('citas'+numrun,response);
      }
    }).catch(e => console.log('DFO: error al encontrar citas médicas '+ JSON.stringify(e)))
  }

  getAllCitasMedicasFromPaciente(numrunPaciente : number){
    // obtiene todas las citas medicas del paciente
    // no importa si están activas o no
    // esta funcion es para el paciente
    let response = []
    let obj = {
      mes : 0,
      dia : 0,
      anno : 0,
      hora : "",
      nombreMedico : "",
      numrunMedico : 0,
      dvrun : "",
      especialidad : "",
      box : "",
      estado : 0,
      id : 0
    }
    return this.database.executeSql("SELECT cit.id_cita as id, cit.mes_cita AS mes_cita, cit.dia_cita AS dia_cita, cit.anno_cita AS anno_cita, cit.hora_cita AS hora_cita, cit.id_estado AS id_estado, med.pnombre_medico||' '||med.apaterno_medico||' '||med.amaterno_medico AS nombre_medico, med.numrun_medico AS numrun, med.dvrun_medico AS dvrun, med.box_medico AS box, esp.nom_esp AS especialidad FROM cita_medica cit JOIN medico med ON cit.numrun_medico = med.numrun_medico JOIN especialidad esp ON med.id_esp = esp.id_esp WHERE numrun_paciente=? ;",[numrunPaciente])
    .then((res) => {
      if (res.rows.length>0){
        for(let i = 0;i<res.rows.length;i++){
          let horaStr = res.rows.item(i).hora_cita as string;
          obj = {
            mes : res.rows.item(i).mes_cita,
            dia : res.rows.item(i).dia_cita,
            anno : res.rows.item(i).anno_cita,
            hora : horaStr.substring(0,5),
            nombreMedico : res.rows.item(i).nombre_medico,
            numrunMedico : res.rows.item(i).numrun,
            dvrun : res.rows.item(i).dvrun,
            box : res.rows.item(i).box,
            especialidad : res.rows.item(i).especialidad,
            estado : res.rows.item(i).id_estado,
            id : res.rows.item(i).id
          }
          response.push(obj);
        }
        this.storage.setItem('citasPaciente'+numrunPaciente,response)
      }
    })
  }

  getCitasMedicasPaciente(numrunMedico : number){
    // obtiene todos los pacientes del medico que tienen horas medicas
    // da igual si están activas o no
    // esta funcion es para el medico
    // ordenar de la ultima a la primera
    console.log('DFO: consultando citas del medico '+numrunMedico)
    let response = [];
    let obj ={
      mes : 0,
      dia : 0,
      anno : 0,
      hora : "",
      estado : 0,
      numrunPaciente : 0,
      dvrunPaciente : "",
      nombrePaciente : "",
      telPaciente : 0,
      id : 0
    }
    return this.database.executeSql("SELECT cit.id_cita as id, cit.mes_cita AS mes_cita, cit.dia_cita AS dia_cita, cit.anno_cita AS anno_cita, cit.hora_cita AS hora_cita, cit.id_estado AS id_estado, cit.numrun_paciente AS numrun_paciente, pac.dvrun_paciente AS dvrun_paciente, pac.pnombre_paciente||' '||pac.apaterno_paciente||' '||pac.amaterno_paciente AS nombre_paciente, pac.tel_paciente AS tel_paciente FROM cita_medica cit JOIN paciente pac ON cit.numrun_paciente = pac.numrun_paciente WHERE numrun_medico =? ORDER BY id_cita DESC;",[numrunMedico])
    .then((res) => {
      if (res.rows.length>0){
        for(let i = 0;i<res.rows.length;i++){
          obj = {
            mes : res.rows.item(i).mes_cita,
            dia : res.rows.item(i).dia_cita,
            anno : res.rows.item(i).anno_cita,
            hora : res.rows.item(i).hora_cita,
            estado : res.rows.item(i).id_estado,
            numrunPaciente : res.rows.item(i).numrun_paciente, 
            dvrunPaciente : res.rows.item(i).dvrun_paciente,
            nombrePaciente : res.rows.item(i).nombre_paciente,
            telPaciente : res.rows.item(i).tel_paciente,
            id : res.rows.item(i).id
          }
          response.push(obj);
        }
        this.storage.setItem('citasMedico'+numrunMedico,response)
      }
    }).catch(e => console.log('DFO: Error obteniendo citas '+JSON.stringify(e)))
  }

  getMedicInfo(nombreMedico : string){
    /// obtiene los datos del médico pero no los genera como un objeto de Medico ya que no quiero el acceso al resto de los items
    const splitName = nombreMedico.split(' ');
    let obj = {
      run : 0,
      dv : "",
      nombreMedico : "",
      especialidad : "",
      box : "",
      tel : 0
    }
    return this.database.executeSql('SELECT med.numrun_medico AS numrun, med.dvrun_medico AS dvrun, med.box_medico AS box, med.tel_medico AS tel, esp.especialidad AS especialidad FROM medico med JOIN especiliadad esp ON med.id_esp = esp.id_esp WHERE ')
  }

  insertCitaMedica(obj : object){
    let values = Object.values(obj);
    /// debe pasersele un objeto con los datos suficiente de la cita
    return this.database.executeSql('INSERT INTO cita_medica(anno_cita, mes_cita, dia_cita, hora_cita,id_estado, numrun_paciente, numrun_medico) VALUES(?,?,?,?,?,?,?);',
      [values[0],values[1],values[2],values[3],values[4],values[5],values[6],])
      .then(() =>{
        console.log('DFO: cita medica agendada')
      }).catch(e => console.log('DFO: Error agregando cita ',JSON.stringify(e)))
  }

  updateCita(id : number, estado : number){
    return this.database.executeSql('UPDATE cita_medica SET id_estado=? WHERE id_cita=?',[estado, id])
    .then(() =>{
      switch(estado){
        case 2:
          this.toast.presentToast('Su cita ha sido cancelada')
          break;
        case 3:
          this.toast.presentToast('Esta cita ha sido finalizada')
          break;
        default:
          break;
      }
    }).catch(e => console.log('DFO: error actualizando tabla cita_medica '+JSON.stringify(e)))
  }

  updatePacienteData(paciente : Paciente){
    return this.database.executeSql('UPDATE paciente SET pnombre_paciente=?, snombre_paciente=?, apaterno_paciente=?, amaterno_paciente=?, tel_paciente=? WHERE numrun_paciente=?',
      [paciente.pnombrePaciente,
        paciente.snombrePaciente,
        paciente.apaternoPaciente,
        paciente.apaternoPaciente,
        paciente.telPaciente, 
        paciente.telPaciente])
      .then(() =>{

        this.toast.presentToast('Datos actualizados exitosamente')
      }).catch(e => console.log('DFO: error actualizando datos '+ JSON.stringify(e)))
  }

  updateMedicData(medico : Medic){
    return this.database.executeSql('UPDATE medico SET pnombre_medico=?, snombre_medico=?, apaterno_medico=?, amaterno_medico=?, tel_medico=?, box_medico=? WHERE numrun_medico=? ;',
      [medico.pnombreMedico,medico.snombreMedico,medico.apaternoMedico,medico.amaternoMedico,medico.telMedico,medico.boxMedico,medico.numrunMedico])
      .then(() => {
        this.toast.presentToast('Datos actualizados exitosamente');
      }).catch(e => console.log('DFO: Error actualizando médico '+JSON.stringify(e)))
  }

  async updateAvatar(idUser : number, avatar : string){
    return this.database.executeSql('UPDATE user SET foto_perfil=? WHERE id_user=? ;',[avatar, idUser])
    .then(() =>{
      this.toast.presentToast('Foto de perfil agregada exitosamente')
    }).catch(e => console.log('DFO: error al agregar foto ',JSON.stringify(e)))
  }

  updateUserEmail(email : string, id : number){
    return this.database.executeSql('UPDATE user SET email=? WHERE id_user=? ;',[email, id])
    .then(() =>{
      this.toast.presentToast('Su email ha sido cambiado')
    }).catch(e => console.log('DFO: error actualizando email '+JSON.stringify(e)))
  }

  checkForPassword( id : number){
    let response = "";
    return this.database.executeSql('SELECT pw FROM user WHERE id_user=? ;',[id])
    .then((res) => {
      if(res.rows.length>0){
        response = res.rows.item(0).pw
        this.storage.setItem('pw'+id,response);
      }
    })
  }

  updatePw(newPw : string, id : number){
    return this.database.executeSql('UPDATE user SET pw=? WHERE id_user=? ;',[newPw,id])
    .then(() =>{
      this.toast.presentToast('La contraseña fue cambiada correctamente')
    }).catch(e => console.log('DFO: Error cambiando contraseña '+JSON.stringify(e)))
  }

  updatePwWithMail(newPw : string, email : string){
    // es lo mismo que el otro pero utiliza el email en lugar del id

    return this.database.executeSql('UPDATE user SET pw=? WHERE email=? ;',[newPw,email])
    .then(() =>{
      this.toast.presentToast('La contraseña fue cambiada correctamente')
    }).catch(e => console.log('DFO: error cambiando la contraseña '+JSON.stringify(e)))
  }

  insertLog(userId : number, logType : number){
    const date = new Date(Date.now());
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hr = date.getHours();
    const min = date.getMinutes();
    const hrMin = hr.toString()+':'+min.toString();
    return this.database.executeSql('INSERT INTO log(anno_log, mes_log, dia_log, hora_log, id_user, id_type) VALUES(?, ?, ?, ?, ?, ?);',
      [year, month, day, hrMin, userId, logType])
      .then(() =>{
        console.log('DFO: Log entry lista')
      }).catch(e => console.log('DFO: error creando log entry '+JSON.stringify(e)))
  }

  async checkEmailExists(email : string) : Promise<boolean>{
    const result = await this.database.executeSql('SELECT COUNT(*) AS count FROM user WHERE email=? ;',[email])
    return result.rows.item(0).count > 0
  }

  logOut(){
    // sirve solo para devolver el observable a falso
    // de esa manera al cerrar sesión no podrá intentar buscar el usuario en el storage
    this.isLoginValid.next(false)
  }

  /// SOLO POR PROPOSITOS DE TESTING, NO USAR
  async getAllUsers() : Promise<number>{
    const result = await this.database.executeSql('SELECT COUNT(*) AS count FROM user;',[])
    return result.rows.item(0).count;
  }

  getAllUsersObj() : Observable<Array<User>>{
    let response : Array<User> = []
    return new Observable(observer => {
      this.database.executeSql('SELECT * FROM user;',[])
      .then((res) => {
        for(let i = 0;i<res.rows.length;i++){
          let userOb = new User(
            res.rows.item(i).id_user,
            res.rows.item(i).email,
            res.rows.item(i).active,
            res.rows.item(i).foto_perfil,
            res.rows.item(i).id_role
          )
          response.push(userOb)
        }
        observer.next(response)
        observer.complete()
      }).catch(e => this.toast.presentToast('Error al obtener lista de usuarios '+JSON.stringify(e)))
    })
  }

  getLogs(): Observable<any[]>{
    let result = []
    let obj = {
      idLog : 0,
      annoLog : 0,
      mesLog : 0,
      diaLog: 0,
      horaLog : "",
      idUser : 0,
      idType : 0,
      type : ""
    }
    return new Observable(observer => {
      this.database.executeSql('SELECT lg.id_log AS id_log, lg.anno_log AS anno_log, lg.mes_log AS mes_log, lg.dia_log AS dia_log, lg.hora_log AS hora_log, lg.id_user AS id_user, lg.id_type AS id_type, ty.desc_type AS type FROM log lg JOIN log_type ty ON lg.id_type = ty.id_type ;',[])
      .then((res) => {
        for (let i = 0;i<res.rows.length;i++){
          obj = {
            idLog : res.rows.item(i).id_log,
            annoLog : res.rows.item(i).anno_log,
            mesLog : res.rows.item(i).mes_log,
            diaLog : res.rows.item(i).dia_log,
            horaLog : res.rows.item(i).hora_log,
            idUser : res.rows.item(i).id_user,
            idType : res.rows.item(i).id_type,
            type : res.rows.item(i).type 
          }
          result.push(obj);
        }
        observer.next(result)
        observer.complete();
      }).catch(e => console.log('DFO: error al obtener logs desde BD '+JSON.stringify(e)))
    })
  }

  updateActive(idUser : number, activeValue : number){
    return this.database.executeSql('UPDATE user SET active=? WHERE id_user=? ;',[activeValue, idUser])
    .then(() =>{
      this.toast.presentToast('El usuario ha sido actualizado')
    }).catch(e => this.toast.presentToast('DFO: error actualizando cuenta '+JSON.stringify(e)))
  }

  getLogType(): Observable<any> {
    let response = [];
    return new Observable(observer => {
      this.database.executeSql('SELECT * FROM log_type;',[])
      .then((res) => {
        if(res.rows.length>0){
          for (let i = 0;i<res.rows.length;i++){
            let type = {
              idType : res.rows.item(i).id_type,
              descLog : res.rows.item(i).desc_type
            }
            response.push(type)
          }
          observer.next(response)
          observer.complete();
        }
      }).catch(e => this.toast.presentToast('Error obteniendo Log Types '+JSON.stringify(e)))
    })
  }

  getListAnnoTrimestre() : Observable<any>{
    // es diferente del otro porque de por sí le doy la lista de trimestres aunque no esten activos
    let response = [];
    return new Observable(observer => {
      this.database.executeSql('SELECT * FROM anno;',[])
      .then((res) => {
        if(res.rows.length>0){
          for(let i = 0;i<res.rows.length;i++){
            let ob = {
              idAnno : res.rows.item(i).id_anno,
              anno : res.rows.item(i).anno,
              idTrimestre : res.rows.item(i).id_trimestre,
              active : res.rows.item(i).active
            }
            response.push(ob)
          }
          observer.next(response);
          observer.complete();
        }
      }).catch(e => console.log('Error Año '+JSON.stringify(e)))
    })
  }

  async insertNewValues(tableVal : number, val : string){
    // recibe 1 o 2 dependiendo si es la tabla especialidad o log_type
    if(tableVal == 1){
      await this.database.executeSql('INSERT INTO especialidad(nom_esp) VALUES(?);',[val])
      .then(() => {
        this.toast.presentToast('Nueva Especialidad agregada')
      }).catch(e => this.toast.presentToast('Error al agregar nuevo dato '+JSON.stringify(e)))
    }
    if(tableVal == 2){
      await this.database.executeSql('INSERT INTO log_type(desc_type) VALUES(?);',[val])
      .then(() => {
        this.toast.presentToast('Nuevo Log Type agregado')
      }).catch(e => this.toast.presentToast('Error al agregar nuevo dato '+JSON.stringify(e)))
    }
  }

  async deleteValues(tableVal : number, id: number){
    if(tableVal == 1){
      await this.database.executeSql('DELETE FROM especialidad WHERE id_esp=? ;',[id])
      .then(() =>{
        this.toast.presentToast('Especiliadad eliminada')
      }).catch(e => this.toast.presentToast('Error al eliminar especialidad '+JSON.stringify(e)))
    }
    if(tableVal == 2){
      await this.database.executeSql('DELETE FROM log_type WHERE id_type=? ;',[id])
      .then(() => {
        this.toast.presentToast('Log Type eliminado')
      }).catch(e => this.toast.presentToast('Error al eliminar Log Type '+JSON.stringify(e)))
    }
  }

  newAnnoTrimestre(anno : number, idTrimestre : number){
    return this.database.executeSql('INSERT INTO anno(anno, id_trimestre, active) VALUES(?,?,0);',
      [anno, idTrimestre])
    .then(() => {
      this.toast.presentToast('Nuevo Año-Trimestre Agregado')
    }).catch(e => this.toast.presentToast('Error al agregar nuevo dato '+JSON.stringify(e)))
  }

  updateStatAnnoTrimestre(idAnno : number, val : number){
    return this.database.executeSql('UPDATE anno SET active=? WHERE id_anno=? ;',[val, idAnno])
    .then(() => {
      this.toast.presentToast('Año-Trimestre ha sido actualizado')
    }).catch(e => this.toast.presentToast('Error al actualizar Año-Trimestre '+JSON.stringify(e)))
  }

  async createUserFromAdmin(role : number, objArray : Array<object>){
    if(role==1){
      // paciente
      let userOb = Object.values(objArray[0]);
      let patOb = Object.values(objArray[1]);
      await this.database.executeSql('INSERT INTO user(email, pw, active, foto_perfil, id_role) VALUES(?, ?, ?, ?, ?);',
        [userOb[0],userOb[1],1,'',1])
        .then(async () =>{
          await this.getIdUserPatient(userOb[0])
          .then(async() =>{
            if(this.gotId>0){
              // orden de los elementos pnombre, snombre, apaterno, amaterno, numrun, dvrun, phone
              await this.database.executeSql('INSERT INTO paciente(numrun_paciente, dvrun_paciente, pnombre_paciente, snombre_paciente, apaterno_paciente, amaterno_paciente, tel_paciente, id_user) '+
                'VALUES(?,?,?,?,?,?,?,?)',
                [patOb[4],patOb[5],patOb[0],patOb[1],patOb[2],patOb[3],patOb[6],this.gotId])
                .then(() =>{
                  this.toast.presentToast('Usuario paciente creado')
                }).catch(e => this.toast.presentToast('Error creando Paciente '+JSON.stringify(e)))
            }
          }).catch(e => this.toast.presentToast('Error obteniendo ID '+JSON.stringify(e)))
        }).catch(e => this.toast.presentToast('Error creando usuario '+JSON.stringify(e)))
    }
    if(role==2){
      let userOb = Object.values(objArray[0]);
      let medOb = Object.values(objArray[1]);
      await this.database.executeSql('INSERT INTO user(email, pw, active, foto_perfil, id_role) VALUES(?, ?, ?, ?, ?);',
        [userOb[0],userOb[1],1,'',2])
        .then(async () =>{
          await this.getIdUserPatient(userOb[0])
          .then(async() =>{
            if(this.gotId>0){
              // orden pnombre, snombre, apaterno, amaterno, numrun, dvrun, phone, box, idEsp, bloque
              await this.database.executeSql('INSERT INTO medico(numrun_medico, dvrun_medico, pnombre_medico, snombre_medico, apaterno_medico, amaterno_medico, tel_medico, box_medico, tiempo_bloque, id_esp, id_user) VALUES(?,?,?,?,?,?,?,?,?,?,?);',
                [medOb[4],medOb[5],medOb[0],medOb[1],medOb[2],medOb[3],medOb[6],medOb[7],medOb[9],medOb[8],this.gotId])
              .then(() =>{
                this.toast.presentToast('Usuario Médico Creado')
              }).catch(e => this.toast.presentToast('Error al crear Médico '+JSON.stringify(e)))
            }
          }).catch(e => this.toast.presentToast('Error al obtener el ID '+JSON.stringify(e)))
        }).catch(e => this.toast.presentToast('Error al crear usuario '+JSON.stringify(e)))
    }
    if(role==3){
      let userOb = Object.values(objArray[0]);
      await this.database.executeSql('INSERT INTO user(email, pw, active, foto_perfil, id_role) VALUES(?, ?, ?, ?, ?);',
        [userOb[0],userOb[1],1,'',3])
        .then(() =>{
          this.toast.presentToast('Usuario Admin creado')
        }).catch(e => this.toast.presentToast('Error al crear usuario '+JSON.stringify(e)))
    }
  }
}

