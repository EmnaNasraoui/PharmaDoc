import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AuthService } from '../auth.service';
import { PharmacyService } from '../pharmacy.service';

@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.css']
})
export class PharmacyComponent implements OnInit {
  num: number;
  UserRole: any;
  id_pharmacy: any;
  messages: any;

  constructor(private socket: Socket, private authService: AuthService, private pharmacyService: PharmacyService) {
    this.messages = [];
  }

  ngOnInit() {
    this.messages = this.authService.ConnectedToken.message;
    this.num = this.authService.ConnectedToken.message.length;

    this.id_pharmacy = this.authService.ConnectedToken.id_pharmacy;
    this.socket.on('requestSended', (data) => {
      this.authService.ConnectedToken.message.push(data)
      this.num = this.authService.ConnectedToken.message.length;
      this.messages = this.authService.ConnectedToken.message;
      console.log(this.messages, 'aaaa')
    });
    this.UserRole = this.authService.ConnectedToken.user_role;
  }

}
