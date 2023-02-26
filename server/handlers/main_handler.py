#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# DESC:

import tornado.web

from server import conf


class BaseHandler(tornado.web.RequestHandler):
    def set_default_headers(self) -> None:
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')

    def initialize(self):
        self.bundle_path = conf.__BUNDLE_PATH__


class LoginHandler(BaseHandler):
    def get(self):
        self.render('index.html', bundle_path=self.bundle_path)
        # self.email = self.get_argument("email")
        # self.password = self.get_argument("password")


class AppHandler(BaseHandler):
    def initialize(self):
        pass

    def get_current_user(self):
        return None

    def on_finish(self):
        pass


class MainHandler(AppHandler):
    @tornado.web.authenticated
    def get(self):
        self.render('index.html', bundle_path=self.bundle_path)


class HelloHandler(AppHandler):
    @tornado.web.authenticated
    def get(self):
        self.write({'hello': 'really?'})
