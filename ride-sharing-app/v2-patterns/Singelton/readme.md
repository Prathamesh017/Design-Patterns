A Good way of using singeleton pattern here will be using single instance of drivers which we are generating though
```
main.initializeDrivers(10);
```

so we can do something like this , if not inialized , it will intaize a new one , else return the existing one

```
  static getInstance(): DriverPool {
    if (!DriverPool.instance) DriverPool.instance = new DriverPool();
    return DriverPool.instance;
  }
```

