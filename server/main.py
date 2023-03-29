#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# DESC: tornado主服务入口

import os

import tornado.web
import tornado.ioloop
import tornado.httpserver

from utils.setting import ConfigParse
from handlers.routers import router

# 项目配置文件路径
__CONFIG_PATH__ = os.path.join(os.path.dirname(__file__), "config/config.ini")

# tornado配置项
settings = {
    "static_path": os.path.join(os.path.dirname(__file__), "public"),
    "template_path": os.path.join(os.path.dirname(__file__), "views"),
}

# 加载配置
conf = ConfigParse(__CONFIG_PATH__)


def make_app(bundle_path, debug):
    routers = router(bundle_path, settings['static_path'])
    return tornado.web.Application(
        debug=debug,
        handlers=routers,
        **settings
    )


if __name__ == '__main__':
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
