Whenever we see a lot of if else statements , like a certain operations have to go through a lot of operations before reaching the final business logic

take an example of request , before reaching the main controller , we 

Authentication – Is the user properly authenticated (e.g., via token or session)?
Authorization – Is the authenticated user allowed to perform this action?
Rate Limiting – Has the user exceeded their allowed number of requests?
Data Validation – Is the request payload well-formed and valid?

A Naive Way to do this will be

class RequestHandler {
   handle(request: Request): void {
       if (!this.authenticate(request)) {
           console.log("Request Rejected: Authentication failed.");
           return;
       }

       if (!this.authorize(request)) {
           console.log("Request Rejected: Authorization failed.");
           return;
       }

       if (!this.rateLimit(request)) {
           console.log("Request Rejected: Rate limit exceeded.");
           return;
       }

       if (!this.validate(request)) {
           console.log("Request Rejected: Invalid payload.");
           return;
       }

       console.log("Request passed all checks. Executing business logic...");
       // Proceed to business logic
   }

   private authenticate(req: Request): boolean {
       return req.user !== null;
   }

   private authorize(req: Request): boolean {
       return req.userRole === "ADMIN";
   }

   private rateLimit(req: Request): boolean {
       return req.requestCount < 100;
   }

   private validate(req: Request): boolean {
       return req.payload !== null && req.payload.trim() !== "";
   }
}


but this is not scalable as whenever there is new entry we have to modify this breaking violating the `Open/Closed Principle`

so with chain of responsibilty for each , function , we define a `handler`
and each handle will have 
1) his own implementaion function
2) has next function , which call the next handler 

interface RequestHandler {
   setNext(next: RequestHandler): void;
   handle(request: Request): void;
}


,This way it helps to main the the order and flow of the requests and keep things separate as well
