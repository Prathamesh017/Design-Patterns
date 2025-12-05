/* A JSON parser should be doing follwoing

a) validation of json - a json should only be consisting of  a string and a object , it can not be array , boolean, number etc 
b) getting any value based on a key
*/

type JsonValue = string | JsonObject;
interface JsonObject {
  [key: string]: JsonValue;
}
class Parser{

    get(obj:JsonObject,ansKey:string):string{
    if (typeof obj !== "object" || obj === null || Array.isArray(obj)) {
       throw new Error("Invalid JSON: must be an object");
       
      }
       for( const [key,value] of Object.entries(obj)){
          if(typeof key!=="string"){
            //key should be always be string
            console.log("invalid key type, should only be string");   
        }
        if(key===ansKey){
            return value.toString();
        }else if(typeof value==="object"){
            return this.get(value,ansKey);
        }
       
     }
     return ''

    }


    validate(obj:any):JsonObject{
        //the object recieved should be any object
      if (typeof obj !== "object" || obj === null || Array.isArray(obj)) {
       throw new Error("Invalid JSON: must be an object");
      }
      const result:JsonObject={}
      for( const [key,value] of Object.entries(obj)){
        if(typeof key!=="string"){
            //key should be always be string
            console.log("invalid key type, should only be string");
            
        }  
      if(typeof value==="string"){
        result[key]=value;
      }else if(typeof value==="object"  && value !== null && !Array.isArray(value)){
        //so valid json object ,
        result[key]=this.validate(value)
      }else{
               throw new Error("Invalid JSON: must be an object");
      }

    }
    return result;



    }


}

const parser=new Parser();
const ans=parser.validate(JSON.parse('{"abc":{"d":"ef","r":"er"}}'))
const val=parser.get(ans,"r")
console.log(val);

