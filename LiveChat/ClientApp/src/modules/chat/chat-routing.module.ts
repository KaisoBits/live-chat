import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChatComponent } from "./components/chat/chat.component";

const ROUTES: Routes = [
  {path: '', component: ChatComponent }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ChatRoutingModule
{
}
