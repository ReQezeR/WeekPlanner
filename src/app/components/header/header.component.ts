import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import { SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() isPreview: boolean = false;
  @Output() public tooglePreview: EventEmitter<any> = new EventEmitter<any>();
  @Output() public downloadPDF: EventEmitter<any> = new EventEmitter<any>();


  constructor() {}

  ngOnInit() {
  }
}
