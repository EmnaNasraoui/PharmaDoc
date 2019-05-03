import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
//  import { Socket } from 'ngx-socket-io';
import { HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  socket: any;
  /* privateMessage: any; */
  constructor( private http: HttpClient) {     this.socket = io();
  }
  getPrivateMessage(idUser1, idUser2) {
    const header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:3000/chatBox/getPrivateMessage/' + idUser1 + '/' + idUser2, {headers: header});
  }
  sendMessage(message, idChat) {
    const header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post('http://localhost:3000/chatBox/sendMessage/' + idChat, message, {headers: header});
  }
  getAllUsers() {
    return this.http.get('http://localhost:3000/pharmacy/allUsers');
  }





  /* , private socket: Socket */
  /*  sendMessage(form) {
    return this.http.post('http://localhost:3000/chatBox/message', form);
  }
  getConversation(id) {
    return this.http.get(`http://localhost:3000/chatBox/message/${id}`);
  }
  getUserConversation( index) {
    return this.http.get(`http://localhost:3000/chatBox/message/user/${index}`);
  }
  getPrivateConvertion(id, form) {
   return this.http.post(`http://localhost:4000/chatbox/conversation/${id}`, form);
  }
  sendMessageSocket() {
  return  this.socket.on('sendMessage', (callback) => {
    console.log(callback);
  });
  }
  getprivateMessageSocket() {
    return this.socket.fromEvent('privateMessage');
  }
  getAllMessageSocket() {
   return this.socket.fromEvent('getAllMessage');
  */
}
