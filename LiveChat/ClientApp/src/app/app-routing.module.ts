import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from './components/register-page/register-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'chat' },
  { path: 'register', component: RegisterPageComponent },
  { path: 'chat', loadChildren: () => import('src/modules/chat/chat.module').then(m => m.ChatModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
