import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCheckboxModule} from '@angular/material/checkbox';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { EventTableComponent } from './components/event-table/event-table.component';
import { AddEventComponent } from './forms/add-event/add-event.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { EditEventComponent } from './forms/edit-event/edit-event.component';
import { PreviewEventTableComponent } from './components/preview-event-table/preview-event-table.component';
import { AddGoogleEventComponent } from './forms/add-google-event/add-google-event.component';


const googleLoginOptions = {
  scope: "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/calendar.events"
}; 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    EventTableComponent,
    AddEventComponent,
    EventCardComponent,
    EditEventComponent,
    PreviewEventTableComponent,
    AddGoogleEventComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    MatGridListModule,
    MatStepperModule,
    MatCheckboxModule,

    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    DragDropModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '439277693992-6ob74ji1krbv7scbv5up2e0pupmgap0l.apps.googleusercontent.com',
              googleLoginOptions
            )
          }
        ]
      } as SocialAuthServiceConfig,
    } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
