#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# DESC: tornado主服务入口

import os

import tornado.web
import tornado.ioloop
import tornado.httpserver

from utils.setting import ConfigParse
from handlers.main_handler import MainHandler, HelloHandler, LoginHandler


def make_app(bundle_path, debug):
    return tornado.web.Application(
        template_path=os.path.join(os.path.dirname(__file__), "views"),
        static_path=os.path.join(os.path.dirname(__file__), "public"),
        debug=debug,
        handlers=[
            (r"/", MainHandler, dict(bundle_path=bundle_path)),
            (r".*/api/hello", HelloHandler),
            (r".*/api/login", LoginHandler)
        ],
    )


if __name__ == '__main__':
    conf = ConfigParse(os.path.join(os.path.dirname(__file__), "config/config.ini"))
    bundle_path = '/static/js/bundle.js'
    debug = False
    if conf.get_section_value("serve", "run_mode") == 'dev':
        bundle_path = 'http://localhost:8008/bundle.js'
        debug = True
    app = make_app(bundle_path, debug)
    port = conf.get_section_int('serve', 'http_port')
    app.listen(8888)
    print(f"http://localhost:{port}")
    tornado.ioloop.IOLoop.current().start()
