import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Word } from '../models/word';
import { WordService } from '../services/word.service';

@Component({
  selector: 'app-word-index',
  templateUrl: './word-index.component.html',
  styleUrls: ['./word-index.component.scss']
})
export class WordIndexComponent implements OnInit, OnDestroy {

    constructor(private wordService: WordService) { }
    subscription!: Subscription
    words: Word[] | null = null
    words$!: Observable<Word[]>


    ngOnInit() {
        this.words$ = this.wordService.words$
    }

    onRemoveWord(wordId: string) {
        this.wordService.removeWord(wordId)
            .subscribe({
                error: err => console.log('err:', err)
            })
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe()
    }

}

