import DLL ,{ node } from "./dll";
import { LRUCache } from "./lru";


class LRUCacheDemo {
    static main(): void {
        console.log("=== LRU Cache Demo ===\n");
        
        const cache = new LRUCache<string, number>(3);

        console.log("1. Adding initial items:");
        let nodeA=new node("a", 1);
        let nodeB=new node("b", 2);
        let nodeC=new node("c", 3);
        let nodeD=new node("d", 4);


        cache.put(nodeA);
        cache.put(nodeB);
        cache.put(nodeC);

        // Accessing 'a' (makes it most recently used)
        const valueA = cache.get('a');
        console.log(`Get 'a': ${valueA}`);

        // Adding 'd' (should evict 'b' - the LRU item)
        cache.put(nodeD);

        // Trying to get 'b' (should return null)
        const valueB = cache.get("b");
        console.log(`Get 'b': ${valueB}`);
    }

}

// Run the demos
LRUCacheDemo.main();

const  dll=new DLL<String,Number>;
let nodeA=new node('a',1);
let nodeB=new node('b',2);
let nodeC=new node('c',3);
let nodeD=new node('d',4);
dll.addFirst(nodeA);
dll.addFirst(nodeB);
dll.addFirst(nodeC);
dll.addFirst(nodeD)
dll.printList()

