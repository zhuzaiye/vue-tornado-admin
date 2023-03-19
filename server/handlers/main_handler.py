#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# DESC:

import json

from server.handlers.base_handler import BaseHandler


class MainHandler(BaseHandler):
    def initialize(self, bundle_path):
        self.bundle_path = bundle_path

    def get(self):
        self.render('index.html', bundle_path=self.bundle_path)


class HelloHandler(BaseHandler):
    def get(self):
        self.write({"code": 200, "msg": "ok", 'data': '加载成功'})


class LoginHandler(BaseHandler):
    def post(self):
        account = self.get_argument("email", None)
        password = self.get_argument("password", None)
        print(account, password)
        if account == "hzzhu2@ifytek.com" and password == "123456":
            self.write(json.dumps({"code": 200, "msg": "ok", "data": {"token": "123"}}))
        else:
            self.write(json.dumps({"code": 400, "msg": "账号或者密码错误", "data": {"token": ""}}))
