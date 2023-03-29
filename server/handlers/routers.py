#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# DESC: 路由组

import tornado.web

from .main_handler import MainHandler, HelloHandler
from .user_handler import LoginHandler, LogoutHandler


def router(bundle_path: str, static_path: str):
    routers = [
        (r"/", MainHandler, dict(bundle_path=bundle_path)),
        (r".*/api/hello", HelloHandler),

        (r".*/api/login", LoginHandler),
        (r".*/api/logout", LogoutHandler),

        # 静态资源
        (r"/(favicon.ico)", tornado.web.StaticFileHandler, dict(path=static_path))
    ]
    return routers
