import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError, from, tap, retry, catchError } from 'rxjs';
import { storageService } from './async-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HeardByOptions, Word } from "../models/word"
import { WordFilter } from "../models/wordFilter"

const ENTITY = 'words'

@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor() {
      const Words = JSON.parse(localStorage.getItem(ENTITY) || 'null')
        if (!Words || Words.length === 0) {
            localStorage.setItem(ENTITY, JSON.stringify(this._createWords()))
        }
   }

  private _words$ = new BehaviorSubject<Word[]>([])
  public words$ = this._words$.asObservable()

  private _wordFilter$ = new BehaviorSubject<WordFilter>({ term: '' });
  public wordFilter$ = this._wordFilter$.asObservable()

   public loadWords() {
      return from(storageService.query(ENTITY))
        .pipe(
         tap(words => {
         const filterBy =  this._wordFilter$.value
            if (filterBy && filterBy.term) {
                 words = this._filter(words, filterBy.term)
            }
             this._words$.next(this._sort(words))
         }),
            retry(1),
           catchError(this._handleError)
        )
    }

    public getWordById(id: string): Observable<Word> {
        return from(storageService.get(ENTITY, id))
            .pipe(catchError(this._handleError))
    }

    public removeWord(id: string) {
        return from(storageService.remove(ENTITY, id))
            .pipe(
                tap(() => {
                    let words = this._words$.value
                    words = words.filter(word => word._id !== id)
                    this._words$.next(words)
                }),
                retry(1),
                catchError(this._handleError)
            )
    }

    public saveWord(word: Word) {    
        return word._id ? this._updateWord(word) : this._addWord(word)
    }

    public getEmptyWord() {
        return {
          word: '',
          heardBy: [],
          createdAt: Date.now(),
        }
    }

    public getColors(key:HeardByOptions ){
      const colors ={ 
        "Mom": "#e688b7",
        "Dad": "#fdc24e",
        "Grandpa": "#303292",
        "Grandma": "#379769"
      }
      return colors[key]
    }

      public setFilter(wordFilter: WordFilter) {
        this._wordFilter$.next({...wordFilter})
        this.loadWords().subscribe()
    }
    
    private _updateWord(word: Word) {
      return from(storageService.put(ENTITY, word))
            .pipe(
                tap(updatedWord => {
                    const words = this._words$.value
                    const wordIdx = words.findIndex(_word => _word._id === word._id)
                    words.splice(wordIdx, 1, updatedWord)
                    this._words$.next([...words])
                    return updatedWord
                }),
                retry(1),
                catchError(this._handleError)
            )
    }

    private _addWord(word: Word) {
        const newWord = new Word(undefined, word.word, word.heardBy, word.createdAt);
        if (typeof newWord.setId === 'function') newWord.setId(this._getRandomId());
        return from(storageService.post(ENTITY, word))
            .pipe(
                tap(newWord => {
                    const words = this._words$.value
                    this._words$.next([...words, newWord])
                }),
                retry(1),
                catchError(this._handleError)
            )
    }

    private _sort(words: Word[]): Word[] {
        return words.sort((a, b) => {
            if (a.word.toLocaleLowerCase() < b.word.toLocaleLowerCase()) {
                return -1;
            }
            if (a.word.toLocaleLowerCase() > b.word.toLocaleLowerCase()) {
                return 1;
            }
            return 0;
        })
    }

    private _filter(words: Word[], term: string) {
        term = term.toLocaleLowerCase()
        return words.filter(word => {
            return word.word.toLocaleLowerCase().includes(term) 
                // word.heardBy.toLocaleLowerCase().includes(term) ||
                // word.createdAt.toLocaleLowerCase().includes(term)
        })
    }

    private _createWords() {
        const words = [
      {
        "_id": "101",
        "word": "Apple",
        "heardBy": ["Dad", "Mom", "Grandma"],
        "createdAt": 1650000000000
      },
      {
        "_id": "102",
        "word": "Ball",
        "heardBy": ["Dad", "Mom"],
        "createdAt": 1651000000000
      },
      {
        "_id": "103",
        "word": "Cat",
        "heardBy": ["Grandma", "Dad"],
        "createdAt": 1652000000000
      },
      {
        "_id": "104",
        "word": "Dog",
        "heardBy": ["Grandma", "Grandpa"],
        "createdAt": 1653000000000
      },
      {
        "_id": "105",
        "word": "Elephant",
        "heardBy": ["Mom", "Grandpa"],
        "createdAt": 1654000000000
      },
      {
        "_id": "106",
        "word": "Fish",
        "heardBy": ["Mom"],
        "createdAt": 1655000000000
      },
      {
        "_id": "107",
        "word": "Giraffe",
        "heardBy": ["Dad", "Grandma"],
        "createdAt": 1656000000000
      },
      {
        "_id": "108",
        "word": "Hat",
        "heardBy": ["Grandpa"],
        "createdAt": 1657000000000
      },
      {
        "_id": "109",
        "word": "Ice cream",
        "heardBy": ["Dad", "Mom"],
        "createdAt": 1658000000000
      },
      {
        "_id": "110",
        "word": "Juice",
        "heardBy": ["Grandpa"],
        "createdAt": 1659000000000
      },
      {
        "_id": "111",
        "word": "Kangaroo",
        "heardBy": ["Grandma"],
        "createdAt": 1660000000000
      },
      {
        "_id": "112",
        "word": "Lion",
        "heardBy": ["Grandpa", "Dad"],
        "createdAt": 1661000000000
      },
      {
        "_id": "113",
        "word": "Monkey",
        "heardBy": ["Mom", "Grandma"],
        "createdAt": 1662000000000
      },
      {
        "_id": "114",
        "word": "Nest",
        "heardBy": ["Grandpa"],
        "createdAt": 1663000000000
      },
      {
        "_id": "115",
        "word": "Octopus",
        "heardBy": ["Dad", "Mom", "Grandma"],
        "createdAt": 1664000000000
      },
      {
        "_id": "116",
        "word": "Pizza",
        "heardBy": ["Mom", "Grandpa"],
        "createdAt": 1665000000000
      },
      {
        "_id": "117",
        "word": "Queen",
        "heardBy": ["Grandma", "Dad"],
        "createdAt": 1666000000000
      },
      {
        "_id": "118",
        "word": "Rabbit",
        "heardBy": ["Grandpa"],
        "createdAt": 166700000000
      }] 
      return words
    }

    private _handleError(err: HttpErrorResponse) {
        console.log('error in pet service:', err)
        return throwError(() => err)
    }

    private _getRandomId(length = 8): string {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
}

