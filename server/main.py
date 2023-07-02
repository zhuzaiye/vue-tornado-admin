#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# DESC: tornado 后台服务

import tornado.web
import tornado.ioloop
import tornado.httpserver

from init import conf
from handlers.routers import router


def make_app(is_debug):
    routers = router()
    return tornado.web.Application(
        debug=is_debug,
        handlers=routers,
    )


if __name__ == '__main__':
    debug = False
    port = conf.get_section_int('serve', 'http_port')
    if conf.get_section_value("serve", "run_mode") == 'dev':
        debug = True
    app = make_app(debug)
    app.listen(port)
    print(f"http://localhost:{port}")
    tornado.ioloop.IOLoop.current().start()
