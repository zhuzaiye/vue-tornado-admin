#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# DESC: suer 控制操作

import json

from .base_handler import BaseHandler


class LoginHandler(BaseHandler):
    def post(self):
        account = self.get_argument("email", None)
        password = self.get_argument("password", None)
        if account == "hzzhu2@ifytek.com" and password == "123456":
            self.write(json.dumps({"code": 200, "msg": "ok", "data": {"token": "123"}}))
        else:
            self.write(json.dumps({"code": 400, "msg": "账号或者密码错误", "data": {"token": ""}}))


class LogoutHandler(BaseHandler):
    def post(self):
        # 删除数据库token
        print("清除缓存token")
        self.write(json.dumps({"code": 200, "msg": "ok", "data": {}}))
