import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { app_routing } from './app.router';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ContactComponent } from './components/contact/contact.component';
import { TalkComponent } from './components/talk/talk.component';
import { ChatComponent } from './components/chat/chat.component';
import { UpdateComponent } from './components/talk/update/update.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    GalleryComponent,
    ContactComponent,
    TalkComponent,
    ChatComponent,
    UpdateComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    app_routing,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
