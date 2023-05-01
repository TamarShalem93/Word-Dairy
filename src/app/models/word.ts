export type  HeardByOptions = 'Mom' | 'Dad' | 'Grandpa' |'Grandma' 

export class Word {
  constructor(
    public _id?: string,
    public word: string = '',
    public heardBy: HeardByOptions[]  = [],
    public createdAt: number = 0
  ) {}

  setId?(id: string = 'r101') {
    // Implement your own set Id
    this._id = id;
  }
}



