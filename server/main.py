#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# DESC: tornado主服务入口

import os

import tornado.web
import tornado.ioloop
import tornado.httpserver

from utils.setting import ConfigParse
from handlers.main_handler import MainHandler, HelloHandler, LoginHandler

settings = {
    "static_path": os.path.join(os.path.dirname(__file__), "public"),
    "template_path": os.path.join(os.path.dirname(__file__), "views"),
    # "login_url": "/login",
    # "xsrf_cookies": True,
}


def make_app(bundle_path, debug):
    return tornado.web.Application(
        debug=debug,
        handlers=[
            (r"/", MainHandler, dict(bundle_path=bundle_path)),
            (r".*/api/hello", HelloHandler),
            (r".*/api/login", LoginHandler),
            (r"/(favicon.ico)", tornado.web.StaticFileHandler,
             dict(path=settings['static_path'])),
        ], **settings)


if __name__ == '__main__':
    conf = ConfigParse(os.path.join(os.path.dirname(__file__), "config/config.ini"))
    debug = False
    bundle_path = '/static/js/bundle.js'
    if conf.get_section_value("serve", "run_mode") == 'dev':
        bundle_path = 'http://localhost:8008/js/bundle.js'
        debug = True
    app = make_app(bundle_path, debug)
    port = conf.get_section_int('serve', 'http_port')
    app.listen(8888)
    print(f"http://localhost:{port}")
    tornado.ioloop.IOLoop.current().start()
