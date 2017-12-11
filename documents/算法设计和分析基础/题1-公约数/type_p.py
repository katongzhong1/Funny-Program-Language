# -*- coding: utf-8 -*-


def euclid(m, n):
    '''
    /*! 最大公约数(取余法) */
    '''
    if (n == 0): 
        return m
    return euclid(n, m%n)

def euclid_sub(m, n):
    '''
    最大公约数(减法版)
    '''
    def sub(a, b):
        '''减法取余的过程'''
        if (a < b):
            return a
        return sub(a-b, b)

    if (n == 0):
        return m
    return euclid_sub(n, sub(m, n))


def euclid_ext(m, n):
    '''扩展欧几里得算法mx + ny = d'''
    if (n == 0):
        return 1, 0, m
    x, y, q = euclid_ext(n, m%n)
    x, y = y, (x - (m//n) * y)
    return x, y, q


def euclid_two(m, n):
    '''
    连续整数算法, 存在严重性能问题
    '''
    def funcname(num):
        if (m % num != 0 or
            n % num != 0):
            num -= 1
            return funcname(num);
        return num;
    return funcname(min(m, n));


print(euclid(31415, 14142))
print(euclid_sub(24, 60))
print(euclid_ext(24, 60))