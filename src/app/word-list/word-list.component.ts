import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Word } from '../models/word';


@Component({
  selector: 'app-word-list',
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.scss']
})
export class WordListComponent {
  @Input() words!: Word[] | null
  @Output() remove = new EventEmitter<string>()

  onLinkClick(event: MouseEvent) {
    event.stopPropagation();
  }
  
}







