import { Component, EventEmitter, Input, Output  } from '@angular/core';
import { Word } from '../models/word';
import { WordService } from '../services/word.service';


@Component({
  selector: 'app-word-preview',
  templateUrl: './word-preview.component.html',
  styleUrls: ['./word-preview.component.scss']
})
export class WordPreviewComponent {

  @Input() word!: Word
  @Output() remove = new EventEmitter<string>()

constructor(public wordService: WordService) { }

    onRemoveWord(event: MouseEvent) {
      event.stopPropagation()
      this.remove.emit(this.word._id)
    }
    onLinkClick(event: MouseEvent) {
      event.stopPropagation();
    }
}
