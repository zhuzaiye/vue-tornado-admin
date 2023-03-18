#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# DESC: 基础handler逻辑

import logging
import tornado.web as web


class BaseHandler(web.RequestHandler):
    def __init__(self, application, request, **kwargs):
        super().__init__(application, request, **kwargs)
        self.logger = logging.getLogger()

    def set_default_headers(self) -> None:
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'GET,PUT,DELETE,POST,HEAD')

    def _initialize(self) -> None:
        self.set_default_headers()