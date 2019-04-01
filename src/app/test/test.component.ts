import { Component, OnInit } from '@angular/core';
/* import { ChatService } from '../chat.service';
import { CookieService } from 'ngx-cookie-service';
import * as jwt_decode from 'jwt-decode';
import { FormGroup, FormControl, Validators } from '@angular/forms'; */
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
 /*  token: any;
  Users: Object;
  id_user: any;
  privateMessage: {}[];
  schemaMessage: { userOne: any; userTwo: any; messages: { contenu: any; date: number; from: any; to: any; }[]; };
  messageSend: FormGroup; */

  constructor(/* private ChatService: ChatService ,private cookieService : CookieService */) { 
   /*  this.messageSend = new FormGroup({
      contenu : new FormControl('', [Validators.required, Validators.minLength(1)]),
    }) */
  }

  ngOnInit() {
  /*   this.id_user= jwt_decode(this.cookieService.get('token')).id._id
    this.ChatService.getConversation(this.id_user).subscribe(res => {
      this.Users = res;
    });
    this.ChatService.getprivateMessageSocket().subscribe(data => {
      this.privateMessage = [data];
    }); */
  }
/*   findConversation(f) {
    const obj = {id : f};
    this.id_user= jwt_decode(this.cookieService.get('token')).id._id
  this.ChatService.getPrivateConvertion(this.id_user, obj).subscribe(res => {
    this.privateMessage = [res];
  });
  } */
  /* sendMessage(f) {
    this.id_user= jwt_decode(this.cookieService.get('token')).id._id
    this.schemaMessage = {
      userOne :   this.id_user,
      userTwo : f,
      messages: [{
        contenu : this.messageSend.value.contenu,
        date : Date.now(),
        from :   this.id_user,
        to: f
      }],
    };
    this.ChatService.sendMessage(this.schemaMessage).subscribe(res => {
       this.findConversation(f);
      this.messageSend.patchValue({
        contenu: '',
      });
    });
  } */
}
