# -*- coding: utf-8 -*-

def selection_sort(arr):
    '''
    选择排序
    Θ(n^2)算法, 但是键的交换次数仅为Θ(n)
    '''
    length = len(arr)
    for i in range(0, length-1):
        min = i
        for j in range(i+1, length):
            if arr[j] < arr[min]:
                min = j
        arr[i], arr[min] = arr[min], arr[i]
    return arr


def bubble_sort(arr):
    '''
    冒泡排序
    Θ(n^2)算法, 键的交换次数最坏的情况下(降序序列)为Θ(n^2)
    '''
    length = len(arr)
    for i in range(0, length-1):
        for j in range(0, length-i-1):
            if arr[j+1] < arr[j]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr


# print(selection_sort([89, 45, 68, 90, 29, 34, 17]))
print(bubble_sort([89, 45, 68, 90, 29, 34, 17]))
