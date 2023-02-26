#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# DESC: tornado主服务入口

import os
import sys

import tornado.ioloop
import tornado.web


class MainHandler(tornado.web.RequestHandler):
    def initialize(self, bundle_path):
        self.bundle_path = bundle_path

    def get(self):
        self.render('index.html', bundle_path=self.bundle_path)


class HelloHandler(tornado.web.RequestHandler):
    def get(self):
        self.write({'hello': 'really?'})


def make_app(bundle_path: str, debug: bool):
    app = tornado.web.Application(
        template_path=os.path.join(os.path.dirname(__file__), "views"),
        static_path=os.path.join(os.path.dirname(__file__), "public"),
        debug=debug,
        handlers=[
            (r"/", MainHandler, dict(bundle_path=bundle_path)),
            (r".*/api/hello", HelloHandler)
        ],
    )
    return app


if __name__ == '__main__':
    bundle_path = "/js/bundle.js"
    debug = False
    app = make_app(bundle_path, debug)
    app.listen(8888)
    print("http://localhost:8888")
    tornado.ioloop.IOLoop.current().start()
