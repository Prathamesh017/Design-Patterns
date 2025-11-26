class node<K,V>{
    key: K;
    value: V;
    prev: node<K, V> | null;
    next: node<K, V> | null;

    constructor(key: K, value: V) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }

}
class DLL<K,V>{
    //here head is null,all the actual values will be between head and tail though
    private readonly head: node<K, V>=new node(null as any,null as any);
    private readonly tail: node<K, V>=new node(null as any,null as any);

    constructor(){
        this.head.next = this.tail;
        this.head.prev=null;
        this.tail.prev = this.head;
        this.tail.next=null;
    }

     addFirst(node: node<K, V>): void {
        // 1. Save the old first node (which the new node will displace)
    const nextNode = this.head.next;

    // --- Connect the new node (node) ---
    node.next = nextNode; // New node points forward to the old first node
    node.prev = this.head; // New node points backward to the head sentinel

    // --- Connect the surrounding nodes to the new node ---
    this.head.next = node; // Head sentinel points forward to the new node
    
    // **CRUCIAL FIX:**
    // The old first node (nextNode) must now point backward to the new node
    if (nextNode) {
        nextNode.prev = node; 
    }
    }
    remove(node:node<K,V>){
        if(node.prev){
            node.prev.next=node.next
        }
        if(node.next){
            node.next.prev=node.prev;
        }

    }
     printList(): void {
        let current = this.head.next;
        while (current !== this.tail && current!==null) {
            console.log(`Key: ${current!.key}, Value: ${current!.value}`);
            current = current!.next;
        }        
    }
    moveToFront(node: node<K, V>){
        //first have to remove from it' current pos and move to top
        this.remove(node);
        this.addFirst(node);
      }

      removeLast(): node<K, V> | null {
        //this means only one element is  remaing
        if (this.tail.prev === this.head) {
            return null;
        }
        //removing tail's prev , because tail is null , it's prev would be the oldest value

        const last = this.tail.prev;
        if (last) {
            this.remove(last);
        }
        return last;
    }
}

export default DLL;
export { node };