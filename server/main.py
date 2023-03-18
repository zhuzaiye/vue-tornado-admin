#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# DESC: tornado主服务入口

import os

import tornado.web
import tornado.ioloop
import tornado.httpserver

import conf

from handlers.main_handler import MainHandler, HelloHandler, LoginHandler

settings = dict(
    template_path=os.path.join(conf.__FILE__, "views"),
    static_path=os.path.join(conf.__FILE__, "static"),
    # cookie_secret="FhLXI+BRRomtuaG47hoXEg3JCdi0BUi8vrpWmoxaoyI=",
    # xsrf_cookies=False,
    debug=conf.__DEBUG__,
    # login_url='/user/login'
)

routers = [
    (r"/", MainHandler),
    (r"/api/login", LoginHandler),
    (r"/api/hello", HelloHandler)
]


class Application(tornado.web.Application):
    def __init__(self, *args, **kwargs):
        super(Application, self).__init__(*args, **kwargs)


if __name__ == '__main__':
    # if __IS_DEVELOP__:
    #     os.system("yarn serve")

    app = Application(routers, **settings)
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(conf.__HTTP_PORT__)
    print(f"http://localhost:{conf.__HTTP_PORT__}")
    tornado.ioloop.IOLoop.current().start()
