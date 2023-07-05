#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# DESC: 路由组

from handlers.user_handler import LoginHandler, LogoutHandler


def router():
    routers = [
        (r".*/user/login", LoginHandler),
        (r".*/user/logout", LogoutHandler),
    ]
    return routers
