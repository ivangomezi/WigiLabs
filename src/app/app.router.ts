import { RouterModule, Routes } from "@angular/router";
import { ChatComponent } from "./components/chat/chat.component";
import { ContactComponent } from "./components/contact/contact.component";
import { GalleryComponent } from "./components/gallery/gallery.component";
import { HomeComponent } from "./components/home/home.component";
import { TalkComponent } from "./components/talk/talk.component";
import { UpdateComponent } from "./components/talk/update/update.component";

const app_routes : Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'home/chat/:id', component: ChatComponent},
    {path: 'gallery', component: GalleryComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'talk', component: TalkComponent},
        {path: 'talk/update/:id', component: UpdateComponent},

    {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const app_routing = RouterModule.forRoot(app_routes);