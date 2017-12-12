# -*- coding: utf-8 -*-

def fib(n):
    '''
    次数A(n) ∈ Θ(Φ^n)
    '''
    if (n <= 1): return n
    return fib(n-1) + fib(n-2)

def fib_re(n):
    x, y = 0, 1
    while y < n:
        x, y = y, x+y
    return y


# print(fib(31))  #=> 0.689s
print(fib_re(31)) #=> 0.062s