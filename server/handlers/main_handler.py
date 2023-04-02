#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# DESC:

from handlers.base_handler import BaseHandler


class MainHandler(BaseHandler):
    def initialize(self, bundle_path):
        self.bundle_path = bundle_path

    def get(self):
        self.render('index.html', bundle_path=self.bundle_path)


class HelloHandler(BaseHandler):
    def get(self):
        user_id = self.get_user()
        print(user_id)
        self.write_ok(f'加载成功 user_id={user_id}')


