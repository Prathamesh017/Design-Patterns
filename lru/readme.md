LRU Cache
LRU stands for Least Recently Used. LRU Cache is a type of cache replacement policy that evicts the least recently accessed item when the cache reaches its capacity.

so whenver a item is used/put ,that make it rencently used  , we have to update its occurence or keep it front to make it is not evicted . the more the item is not used it occurence count keeps same or it goes backward 


so at the least a lru  should fetch a value (`get`) and  update/post a value(`update`)

The core challenge here is twofold:
We need fast key-based lookup for cache reads and updates.
We need fast ordering to track item usage and enforce eviction based on recency.

so for 
a) faster lookup - a map sounds most fast
b) for fast ordering or tracking items
* Move a recently accessed item to the front (marking it as Most Recently Used, or MRU)
* Remove the least recently used item from the back when the cache exceeds its capacity
* Insert new items to the front (they're considered most recently used)
* Perform all of these operations in O(1) time

An array won't work as we have constantly rearrange things , so a better option would be dll where we can easily manipulate things
Each node maintains references to both its prev and next nodes, allowing us to:
* Remove a node from the list in O(1)
* Move a node to the head in O(1)
* Evict the least recently used node from the tail in O(1)

so we need a map and dll as well


Operations:
get(key): fetch value and move item to front (MRU).
put(key, value): insert new item or update existing, move to front. If capacity is full, evict from tail (LRU). Core challenge: achieve O(1) lookup and O(1) ordering.
Map → O(1) key lookup.
DLL → O(1) reordering (move to head, remove from tail). Together → true LRU cache with all operations in O(1).