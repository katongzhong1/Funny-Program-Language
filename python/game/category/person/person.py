# -*- coding: utf-8 -*-
# ---------------------------------------
#   Person
#   版本：1.0
# ---------------------------------------

class Person(object):
    #==========================================
    # * 定义基本属性
    #==========================================
    name = ''
    age  = 0
    
    #定义私有属性

    #定义构造方法
    def __init__(self, pid=None, father=None, mother=None):
        """ 返回指定的人 或是 生成一个新的婴儿 """
        if pid is None: 
            "生成婴儿"
            self.age = 0
            pass
        else:
            "返回指定的人"
            pass

    def _create_name(self, surname=""):
        """生成姓名"""
    
        
