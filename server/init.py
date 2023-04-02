#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# DESC: 程序初始化

import os

from lib.mysql import SqlDB
from utils.setting import ConfigParse

# 项目配置文件路径
__CONFIG_PATH__ = os.path.join(os.path.dirname(__file__), "config/config.ini")
conf = ConfigParse(__CONFIG_PATH__)

# tornado配置项
settings = {
    "static_path": os.path.join(os.path.dirname(__file__), "public"),
    "template_path": os.path.join(os.path.dirname(__file__), "views"),
}

# 数据库, 缓存库, AWS配置section
DB_conf_cn = {"database": conf.get_section_value("mysql_cn", "database"),
              "host": conf.get_section_value("mysql_cn", "host"),
              "port": conf.get_section_int("mysql_cn", "port"),
              "password": conf.get_section_value("mysql_cn", "password"),
              "user": conf.get_section_value("mysql_cn", "user")}

DB_cn = SqlDB(DB_conf_cn)
