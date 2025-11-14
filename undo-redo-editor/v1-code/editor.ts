class Editor{
    word:string;
    undoArr:string[]
    redoArr:string[]
    constructor(word:string){
        this.word=word;
        this.undoArr=[];
        this.redoArr=[];
    }
    currentWord(){
        // console.log(this.undoArr,this.redoArr);
        return this.word;

    }
    write(word:string){
        this.word+=word
        this.undoArr.push(word);
        this.redoArr=[];
    }
    undo(){
        let word=this.undoArr.pop()
        if(word){
        this.redoArr.push(word);
        this.word=this.word.slice(0,-word.length);
        }
    }
    redo(){
        let word=this.redoArr.pop()
        if(word){
        this.word=this.word+word;
        this.undoArr.push(word)
        }
    }
    
}

export default Editor;