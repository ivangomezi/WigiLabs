import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable, Subscriber, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  socket : any;
  server = "http://localhost:3000";

  constructor() {
    try {
      this.socket = io(this.server, {
        withCredentials: true,
        extraHeaders: {
          "my-custom-header": "abcd"
        }
      });
    } catch (error) {
      console.log(error)
    }
    
  }

  listen(eventName: String){
    return new Observable((Subscriber) => {
      this.socket.on(eventName, (data : any) => {
        Subscriber.next(data);
      })
    })
  }

  emit(eventName: String, data: any) {
    try {
      this.socket.emit(eventName, data)
    } catch (error) {
      console.log(error)
    }
  }
}
