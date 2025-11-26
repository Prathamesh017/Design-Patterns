import DLL ,{ node } from "./dll";
export class LRUCache<K,V>{
    //should have a fixed capactiy , so we can revoke the least accessed 
    private readonly capacity: number;
    private readonly map: Map<K, node<K, V>>;
    private readonly dll: DLL<K, V>;

      constructor(capacity: number) {
        this.capacity = capacity;
        this.map = new Map<K, node<K, V>>();
        this.dll = new DLL<K, V>();
    }
     get(key:K): V | null {
        if (!this.map.has(key)) {
            return null;
        }
        const node = this.map.get(key)!;
        this.dll.moveToFront(node);
        return node.value;
    }
    put(node:node<K,V>){
        const key=node.key;
        const val=node.value;
        //check if it already exists
        if(this.map.has(key)){
            //value exists , so move to front as recently used
            this.dll.moveToFront(node);
        }
        //if doesn't exist
        else{
            //check already capacity is full , if yes remove the 
            if (this.map.size === this.capacity) {
                // Evict least recently used
                const lru = this.dll.removeLast();
                if (lru) {
                    this.map.delete(lru.key);
                }
            }
            //will move to occurence to first only just after head
            this.dll.addFirst(node);
            this.map.set(key, node);
        }

    }
}