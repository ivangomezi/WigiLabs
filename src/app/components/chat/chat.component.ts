import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebSocketService } from '../services/web-socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  userChat = {
    user: '',
    text: '',
    hours: ''
  }

  
  fecha = '';

  myMessages:any ='';
  eventName = "send-message"

  constructor(private activated: ActivatedRoute, private webService : WebSocketService) { }

  @ViewChild('box_send_chat') private myScrollContainer!: ElementRef;

  ngOnInit(): void {
    this.setMessage();
  }

  allTime(){
    const date = new Date();
    let hh = date.getHours().toString();
    let min = date.getMinutes().toString();
    hh = hh.length === 2 ? hh : "0" + hh;
    min = min.length === 2 ? min : "0" + min;
    this.fecha = hh + ":" + min;
  }
  
  scrollRow(){
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  }

  setMessage(){
    this.allTime();

    const id = this.activated.snapshot.params.id;
    this.userChat.user = id;
    this.userChat.hours = this.fecha;
    this.webService.listen('text-event').subscribe((data) => {
      this.myMessages = data;
      
      setTimeout(() => {
        this.scrollRow();
      }, 200);
    })
  }

  myMessage(){
    if(this.userChat.text.trim() != ""){
      this.allTime();
  
      this.userChat.hours = this.fecha;
      this.webService.emit(this.eventName, this.userChat);
      this.userChat.text = '';

      setTimeout(() => {
        this.scrollRow();
      }, 200);
    }
    else {
      this.userChat.text = '';
    }
  }

}
