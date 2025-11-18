Proxy Pattern as the name suggest acts as a proxy for another service , what can be use of this though

1) Imagine a functionailty needs high compute everytime it is called , so instead of that we can add a proxy layer , which essentially has same function method as the original one , so no client errors , and there we store the cached value , if not exist fetch from the og then
2) we want to add some more functionalities without changing the existing code , we can make create a proxy class , so client anyways won't know which service it is using.