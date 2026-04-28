export interface IWord{
    word : string  ; 
    reading : string ; 
    meaning : string ; 
}

export type JLPTLevel = 'N1' | 'N2' | 'N3' | 'N4' | 'N5' ; 

export interface IKanji {
    _id: string;
    character: string;
    level: JLPTLevel;
    onyomi: string[];
    kunyomi: string[];
    meaning: string;
    strokeCount: number;
    imageUrl: string;
    words: IWord[];
}