#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# DESC: tornado主服务入口

import tornado.web
import tornado.ioloop
import tornado.httpserver

from init import settings, conf
from handlers.routers import router


def make_app(bundle_js_path, is_debug):
    routers = router(bundle_js_path, settings['static_path'])
    return tornado.web.Application(
        debug=is_debug,
        handlers=routers,
        **settings
    )


if __name__ == '__main__':
    debug, bundle_path = False, conf.get_section_value("bundle", "path")
    port = conf.get_section_int('serve', 'http_port')
    if conf.get_section_value("serve", "run_mode") == 'dev':
        debug, bundle_path = True, 'http://localhost:8008/js/bundle.js'
    app = make_app(bundle_path, debug)
    app.listen(port)
    print(f"http://localhost:{port}")
    tornado.ioloop.IOLoop.current().start()
