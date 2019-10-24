import {Component, OnInit} from '@angular/core';
import {AppConfig} from '../../../configs/app.config';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {
  public version: string = AppConfig.version;
  constructor() {
  }

  ngOnInit() {
  }
}
