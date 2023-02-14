import { Component, OnInit } from '@angular/core';
import PersonService from '../services/service.person';

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.scss']
})
export class InstructionComponent implements OnInit {

  constructor( public personSer:PersonService) { }

  ngOnInit(): void {
  }

}
