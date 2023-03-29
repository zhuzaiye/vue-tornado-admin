#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# DESC:

import json

from .base_handler import BaseHandler


class MainHandler(BaseHandler):
    def initialize(self, bundle_path):
        self.bundle_path = bundle_path

    def get(self):
        self.render('index.html', bundle_path=self.bundle_path)


class HelloHandler(BaseHandler):
    def get(self):
        self.write({"code": 200, "msg": "ok", 'data': '加载成功'})


