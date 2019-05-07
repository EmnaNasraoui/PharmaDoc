import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Socket } from 'ngx-socket-io';
import { ChatService } from '../chat.service';
import { PharmacyService } from '../pharmacy.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  listeUsers: any;
  chosenUser: any;
  listeMessages: any;
  messageForm: FormGroup;
  conversation: any;
  connectedUser: any;
  constructor(private socket: Socket, private chatService: ChatService, private pharmacyService: PharmacyService, private authService: AuthService) {
    this.listeMessages = [];
    this.listeUsers = [];
    this.messageForm = new FormGroup({
      content: new FormControl(''),
      user: new FormControl(''),
    });
  }

  ngOnInit() {
    this.messageForm = new FormGroup({
      content: new FormControl(''),
      user: new FormControl(this.authService.ConnectedUser()),
    });
    this.connectedUser = this.authService.ConnectedUser()._id;
    console.log(this.connectedUser)
    this.socket.on('newUserAdded', () => {
      this.chatService.getAllUsers().subscribe((res: any) => {
        this.listeUsers = res.filter(obj => obj._id !== this.authService.ConnectedUser()._id);
      });
    });
    this.chatService.getAllUsers().subscribe((res: any) => {
      this.listeUsers = res.filter(obj => obj._id !== this.authService.ConnectedUser()._id);
      this.clickUser(this.listeUsers[0]._id);
    });
    this.socket.on('newmessagesended', () => {
      this.clickUser(this.chosenUser);
      console.log('hahahaha');
    });
  }
  clickUser(idUser) {
    this.chosenUser = idUser;
    this.chatService.getPrivateMessage(idUser,this.authService.ConnectedUser()._id).subscribe((res: any) => {
      console.log(res);
      this.conversation = res._id;
      this.listeMessages = res.messages;
    });
  }
  sendMessage() {
    console.log('clicked');
    this.chatService.sendMessage(this.messageForm.value, this.conversation).subscribe((data: any) =>{
      console.log(data)
    });
  }
}
