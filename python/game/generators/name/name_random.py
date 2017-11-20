# -*- coding: utf-8 -*-

import random
from name_const import (
    SURNAME_WEIGHT,
    SURNAME_LIST,
    NAME_LIST
)

def fullname(surname=''):
    if len(surname) == 0:
        return generator_surname() + generator_name()
    else: 
        return surname + generator_name()

def names():
    names = { "金": [], "木": [], "水": [], "火": [], "土": [] }
    for name in NAME_LIST:
        names[name[2]].append(name[1])
    return names

def generator_name():
    ns = names()
    pro = [ "金", "水", "木", "火", "土" ][random.randint(0, 4)]
    name_list = ns[pro]
    name = ''
    for i in range(random.randint(1, 2)):
        name = name + name_list[random.randint(0, len(name_list)-1)]
    return name

def surnames():
    """ 姓 列表 TODO:优化获取姓的算法 """
    surnames = []
    w = 0
    for idx, names in enumerate(SURNAME_LIST):
        for i, name in enumerate(names):
            surnames.append({
                "name": name,
                'min': w,
                'max': w + SURNAME_WEIGHT[idx] - 1
            })
            w += SURNAME_WEIGHT[idx]
    return surnames
   

def generator_surname():
    """生成 姓"""
    names = surnames()
    count = names[len(names) - 1]['max']
    idx = random.randint(1, count)

    for x in names:
        if x['min'] <= idx and x['max'] >= idx:
            name_dict = x
            break

    return name_dict['name']

if __name__ == '__main__':
    for i in range(10):
        print(fullname('陶'))

