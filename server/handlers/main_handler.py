#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# DESC:
import json

import tornado.web

from server import conf


class BaseHandler(tornado.web.RequestHandler):
    def set_default_headers(self) -> None:
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "*")
        self.set_header('Access-Control-Allow-Methods', "*")

    def initialize(self):
        self.bundle_path = conf.__BUNDLE_PATH__
        self.set_default_headers()

    def options(self):
        self.finish()


class LoginHandler(BaseHandler):
    # def get(self):
    #     self.render('index.html', bundle_path=self.bundle_path)

    def post(self):
        account = self.get_argument("email", None)
        password = self.get_argument("password", None)
        print(account, password)
        if account == "admin@123.com" and password == "123456":
            self.write(json.dumps({"code": 200, "msg": "ok", "token": "123"}))
            self.redirect("/user/login")
        else:
            self.write(json.dumps({"code": 200, "msg": "账号或者密码错误", "token": "123"}))
            self.redirect("/")


class AppHandler(BaseHandler):
    def initialize(self):
        pass

    def get_current_user(self):
        return None

    def on_finish(self):
        pass


class MainHandler(BaseHandler):
    def get(self):
        self.render('index.html', bundle_path=self.bundle_path)


class HelloHandler(BaseHandler):
    def get(self):
        self.write({'hello': 'really?'})
