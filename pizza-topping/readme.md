A decorator is useful when we have a combination of multiple options. For example, think about coffee: the basic cup is just water and coffee, and we can add different decorators like water+coffee+milk or water+coffee+milk+sugar.

Here we can have different types of combinations, and the base class will stay constant for all of them.

In the given example, Margherita is the base class, so each combo will definitely start with that.

We have different types of decorators as combinations for enhancing them, and each decorator will take the next decorator or base as a parameter to set things up and build combos.