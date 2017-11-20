# -*- coding: utf-8 -*-
#---------------------------------------
#   程序：简单借款代码混淆
#   版本：0.1
#   作者：zhong
#   日期：2017-08-14
#   语言：Python 2.7
#   问题：
#       问题1.
#       ==> a.现象: 借款成功页面出现闪退
#       ==> b.原因: 借款成功页面是swift编写, 方法混淆会出现问题, 主要是swift文件内的方法对.pch编译的文件
#       ==> c.解决方式: 先对 swift 调用的 oc 方法进行过滤处理
#
#       问题2:
#       ==> a.现象: 联系人选择页面出现没有调用代理的情况
#       ==> b.原因: 对系统的方法进行了代码混淆导致的问题
#       ==> c.解决方式: 对所有系统使用的库的方法名都进行了过滤处理
#
#       问题3:
#       ==> a.现象: 我的优惠券页面出现优惠券显示借款详情导致的问题
#       ==> b.原因: fd_自动计算高度的方法, 出现的情况是reload的时候, 不能再次计算高度, 导致的问题
#       ==> c.解决方式: 对fd_开头的方法混淆都进行了过滤
#---------------------------------------

import os
import re
import random
import string
import json
import sys
import time

reload(sys)
sys.setdefaultencoding('utf-8')

Framework_PATH = '/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/SDKs/iPhoneOS.sdk/System/Library/Frameworks'
temp = []
property_list = []
# UIEdgeInsets 的四个属性导致
noList = ['top',
          'left',
          'right',
          'bottom',
          'width',
          'height',
          'property',
          'settingId',
          'isHighlighted',
          'isEnabled',
          'errorType',
          'totalCount',
          'isOpen',
          'overlay',
          'isSelect',
          'colorWithHexString',
          'andSDKKey',
          'centerX',
          'centerY',
          'subLabel',
          'handler',
          'clickedButtonAtIndex',
          'isExecuting',
          'emptyImage',
          'return',
          'CGFontRef',
          'CTFontRef',
          'button',
          'needBackToHomePage',
          'showProgressHud',
          'showProgressHudWithMessage',
          'showToast',
          'showtoast',
          'primaryKey'
          ]
# 字典 文件名
file_name_dict = {}
#不需要混淆的文件名
no_file_name = ['AppDelegate', 'main', 'ViewController', 'UFQGlobal']


#=======================================================================================================================
# * Common 公共方法
#=======================================================================================================================

def id_generator(size=16, chars=string.ascii_letters):
    """获取16位只含大小写字母的字符串"""
    return ''.join(random.choice(chars) for _ in range(size))


def create_h(path):
    """生成宏定义头文件"""
    to_path = path + '/codeObfuscation.h'
    with open(to_path, 'w') as w:
        w.write('#ifndef Demo_codeObfuscation_h\n#define Demo_codeObfuscation_h\n')
        for k, v in file_name_dict.items():
            w.write('#define %s %s\n' % (k, v))
        w.write('#endif\n')


def store(path):
    """存储文件"""
    with open(path, 'w') as json_file:
        json_file.write(json.dumps(file_name_dict))


def load(path):
    """读取文件"""
    if not os.path.exists(path):
        return file_name_dict
    with open(path) as json_file:
        data = json.load(json_file, encoding='utf-8')
        return data


def get_value(key):
    """获取唯一的字符串"""
    id = id_generator()
    if id not in temp:
        temp.append(id)
        return id
    return get_value(key)


def file_dir_handler(path, file_handler, dir_handler):
    """遍历文件夹及子文件夹的处理"""
    for rt, dirs, files, in os.walk(path):
        for f in files:
            file_handler(f, rt)
        for dir_name in dirs:
            dir_handler(dir_name, rt)


#=======================================================================================================================
# * find_func 寻找混淆方法名
#=======================================================================================================================

def find_func(path, add_or_del):
    """找到属性名和方法, 从file_name_dict中添加或删除"""
    prefix = '[add]==>' if add_or_del else '[delete]==>'
    print(prefix + path)

    # 属性名称
    property_re = r'(?m)^\s*@property\s*(?:\([0-9A-Za-z_, =]+\))?\s*\b[0-9A-Za-z_]+\b(?:<[A-Za-z *]+>)?\s*(?:\*)?\s*(\b[0-9A-Za-z_]+\b)\s*'
    with open(path, 'r') as f:
        h_list = re.findall(property_re, f.read())
    if not path.endswith('.h'):
        f_path = path[:-2] + '.h'
        if os.path.exists(f_path):
            with open(f_path, 'r') as mf:
                f_list = re.findall(property_re, mf.read())
                h_list.extend(f_list)

    # 移除属性名, 因为会有set方法等导致程序崩溃
    for name in h_list:
        if name in file_name_dict:
            del file_name_dict[name]

    # 添加到公共属性表中
    property_list.extend(h_list)

    # 查找方法名称, 然后从file_name_dict中删除或添加
    with open(path, 'r') as f:
        funcList = re.findall(r'(?m)^\s*(?:-|\+)\s*\(.+?\)([a-zA-Z_0-9]+):?', f.read())
        for func in funcList:
            if re.match(r'^set[A-Z].*', func) or func in noList or func.startswith('init'):
                # 去除set方法 init方法
                continue
            if add_or_del:
                if func not in property_list and not func.startswith('fd_'):
                    file_name_dict[func] = get_value(func)
            else:
                if func in file_name_dict:
                    del file_name_dict[func]
    if 'loadData' not in file_name_dict:
        file_name_dict['loadData'] = get_value('loadData')


def find_func_file(path, add_or_del=False):
    """遍历文件夹及子文件夹, 寻找文件"""
    def dir_handler(dir_name, rt):
        pass

    def file_handler(file_name, rt):
        arr = file_name.split('.')
        ext = arr[1] if len(arr) >= 2 else ''
        if ext in ['h', 'm', 'mm']:
            find_func(rt + '/' + file_name, add_or_del)

    file_dir_handler(path, file_handler, dir_handler)


#=======================================================================================================================
# * find_class 寻找混淆类名
#=======================================================================================================================

def find_class_dict(path):
    """ 找到需要混淆的文件名, 并生成唯一不重复的随机名称, 返回字典 """
    def dir_handler(dir_name, rt):
        pass

    def file_handler(file_name, rt):
        arr = file_name.split('.')
        name = arr[0]
        ext = arr[1] if len(arr) >= 2 else ''
        if name in no_file_name or name in file_name_dict or '+' in name:
            return
        if os.path.exists(os.path.join(rt, name + '.xib')):
            return
        if ext in ['h', 'm', 'mm']:
            file_name_dict[name] = get_value(name)

    file_dir_handler(path, file_handler, dir_handler)


#=======================================================================================================================
# * replace_content 替换指定的类名或方法名
#=======================================================================================================================

def replace_content(path, name_dict):
    """替换文件中file_name_dict含有的key"""
    print(path)
    with open(path, 'r') as f:
        content = f.read()
        for k, v in name_dict.items():
            content = re.sub(r"""\b%(key)s\b""" % {'key': k}, v, content)
    with open(path, 'w') as w:
        w.write(content)


def replace_file_dir(path, name_dict):
    """用途指定的字典(键值对)替换指定路径下文件的内容"""
    if os.path.isfile(path):
        """如果是文件则直接替换文件内容"""
        replace_content(path, name_dict)
        return

    def rename(rt, old, new):
        os.rename(os.path.join(rt, old), os.path.join(rt, new))

    def file_handler(file_name, rt):
        arr = file_name.split('.')
        name = arr[0]
        ext = arr[1] if len(arr) >= 2 else ''
        if ext in ['h', 'm', 'mm', 'swift', 'pbxproj', 'pch']:
            # 如果需要修改文件名 修改文件名称
            # print('orgin==>' + os.path.join(rt, file_name))
            if name in name_dict:
                new_file = name_dict[name] + '.' + ext
                rename(rt, file_name, new_file)
                replace_content(os.path.join(rt, new_file), name_dict)
            else:
                replace_content(os.path.join(rt, file_name), name_dict)

    def dir_handler(dir_name, rt):
        if dir_name in name_dict:
            rename(rt, dir_name, name_dict[dir_name])
            replace_file_dir(os.path.join(rt, name_dict[dir_name]), name_dict)


    file_dir_handler(path, file_handler, dir_handler)


#=======================================================================================================================
# * code_obfuscation  代码混淆
#=======================================================================================================================

def code_obfuscation(pro, class_list, func_list, func_avoid, replace_list):
    """代码混淆"""
    def path_join(s):
        return os.path.join(pro, s)

    json_dict = load(path_join('obfuscation'))
    if not json_dict:
        # 查找类名
        [find_class_dict(path_join(path)) for path in class_list]
        # 查找方法名
        [find_func_file(path_join(path), True) for path in func_list]
        # 删除方法名
        [find_func_file(path_join(path), False) for path in func_avoid]
        store(path_join('obfuscation'))
    # 替换
    replace_start = time.time()
    [replace_file_dir(path_join(path), json_dict) for path in replace_list]
    replace_end = time.time()
    print(replace_end - replace_start)


def reverse_obfuscation(pro, replace_list):
    """代码 反-混淆"""
    obj_file = os.path.join(pro, 'obfuscation')
    json_dict = load(obj_file)
    if not json_dict:
        return
    # 键值对调
    replace_start = time.time()
    json_dict = dict((val, key) for key, val in json_dict.items())
    [replace_file_dir(os.path.join(pro, path), json_dict) for path in replace_list]
    replace_end = time.time()
    print(replace_end - replace_start)


#=======================================================================================================================
# * sudaibear  简单借款
#=======================================================================================================================

# 简单借款工程路径
sudaibear_pro = '/Users/wushengzhong/sudaibear/PeopleMoney'
# 简单借款类名路径
sudaibear_class = [
    'PeopleMoney'
]
# 简单借款方法名路径
sudaibear_func = [
    'PeopleMoney',
    'CateGory'
]
# 简单借款避免的方法名路径
sudaibear_func_avoid = [
    os.path.join(sudaibear_pro, 'Lib'),
    os.path.join(sudaibear_pro, 'Pods/Headers'),
    Framework_PATH
]
# 优分期需要替换内容的文件路径
sudaibear_replace_list = [
    'PeopleMoney.xcodeproj',
    'CateGory',
    'Lib',
    'PeopleMoney',
    'UIkitPackage',
    'ufenqi/Prefix.pch'
]


def sudaibear_code_obfuscation():
    """简单借款 代码混淆"""
    code_obfuscation(sudaibear_pro,
                     sudaibear_class,
                     sudaibear_func,
                     sudaibear_func_avoid,
                     sudaibear_replace_list)


def sudaibear_reverse_obfuscation():
    """简单借款 反-代码混淆"""
    reverse_obfuscation(sudaibear_pro, sudaibear_replace_list)


#=======================================================================================================================
# * ufenqi  优分期
#=======================================================================================================================

# 优分期工程路径
ufenqi_pro = '/Users/wushengzhong/Desktop/ufenqi'
# 优分期类名路径
ufenqi_class = [
    'ufenqi/ViewController',
]
# 优分期方法名路径
ufenqi_func = [
    'ufenqi/ViewController',
    'ufenqi/SDK/Custom',
    'ufenqi/Category'
]
# 优分期避免的方法名路径
ufenqi_func_avoid = [
    os.path.join(ufenqi_pro, 'ufenqi/SDK/Third'),
    os.path.join(ufenqi_pro, 'Pods/Headers'),
    Framework_PATH
]
# 优分期需要替换内容的文件路径
ufenqi_replace_list = [
    'ufenqi/AppDelegate.mm',
    'ufenqi/ViewController',
    'ufenqi/SDK/Custom',
    'ufenqi/Category',
    'ufenqi.xcodeproj',
    'ufenqi/Prefix.pch',
    'ufenqi/SDK/Third/XNTalkerAgent',
    'ufenqi/SDK/Third/NTalkerSDK/ViewController',
    'ufenqi/SDK/Third/NTalkerSDK/View',
    'ufenqi/SDK/Third/UFQInitThirdSDK',
    'ufenqi/SDK/Third/UFQReachableCenter',
    'ufenqi/SDK/Third/Protocol'
]


def ufenqi_method_obfuscation():
    """优分期 代码混淆"""
    code_obfuscation(ufenqi_pro,
                     ufenqi_class,
                     ufenqi_func,
                     ufenqi_func_avoid,
                     ufenqi_replace_list)


def ufenqi_reverse_obfuscation():
    """优分期 反-代码混淆"""
    reverse_obfuscation(ufenqi_pro, ufenqi_replace_list)

# 优分期 代码混淆 时长 95~105s
ufenqi_method_obfuscation()
# 优分期 反-代码混淆 时长 95~105s
#ufenqi_reverse_obfuscation()

#code_obfuscation()
#method_code_obfuscation()


