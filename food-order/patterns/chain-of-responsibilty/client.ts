import { RequestHandler } from "./base-class";
import { GlutenFreeHandler,KidsMealHandler,PremiumHandler,NormalHandler,ExtraSpicyHandler } from "./main-class";

function main() {
        // Create handlers
        const glutenFree: RequestHandler = new GlutenFreeHandler();
        const extraSpicy: RequestHandler = new ExtraSpicyHandler();
        const kidsMeal: RequestHandler = new KidsMealHandler();
        const premium: RequestHandler = new PremiumHandler();
        const normal: RequestHandler = new NormalHandler();
        // Build the chain
        
        glutenFree.setNext(extraSpicy);
        extraSpicy.setNext(kidsMeal);
        kidsMeal.setNext(premium);
        premium.setNext(normal);
 
       
    }

main();