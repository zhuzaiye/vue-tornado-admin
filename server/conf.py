#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# DESC:

import os
from utils.setting import ConfigParse

# 服务配置文件
__CONFIG_PATH__ = "config/config.ini"
__FILE__ = os.path.dirname(__file__)
__CONFIG__ = ConfigParse(__CONFIG_PATH__)
__BUNDLE_PATH__ = "/static/js/bundle.js"
__DEBUG__ = False
__IS_DEVELOP__ = False
__HTTP_PORT__ = __CONFIG__.get_section_int("serve", "http_port")

if __CONFIG__.get_section_value("npm", "run_mode") == "dev":
    __BUNDLE_PATH__ = 'http://localhost:8008/bundle.js'
    __IS_DEVELOP__ = True
    __DEBUG__ = True


