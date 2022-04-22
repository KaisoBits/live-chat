import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './components/chat/chat.component';
import { MessageBoxComponent } from './components/message-box/message-box.component';
import { MessageInputComponent } from './components/message-input/message-input.component';
import { MessageComponent } from './components/message/message.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule } from '@angular/forms';
import { ChatRoutingModule } from './chat-routing.module';

@NgModule({
  declarations: [
    ChatComponent,
    MessageComponent,
    MessageBoxComponent,
    MessageInputComponent,
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule,
    MatSliderModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    MatSnackBarModule,
    MatStepperModule,
  ],
  providers: [],
  exports: [ChatComponent],
})
export class ChatModule {}
