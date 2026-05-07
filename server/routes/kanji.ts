import {Router} from 'express' ; 

import { getKanji, getKanjiByCharacter } from '../controllers/kanjiController';
import { resolveObjectURL } from 'node:buffer';


const router = Router() ; 




router.get('/',getKanji) ;
router.get('/:character',getKanjiByCharacter)  ; 


export default router ;