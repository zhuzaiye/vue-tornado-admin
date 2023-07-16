#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# DESC: 路由组

from handlers.demo_handler import TableHandler
from handlers.user_handler import LoginHandler, LogoutHandler, GetUserHandler


def router():
    routers = [
        (r".*/user/login", LoginHandler),
        (r".*/user/logout", LogoutHandler),
        (r"/user/info", GetUserHandler),

        # 用于测试
        (r"/table/list", TableHandler)
    ]
    return routers
