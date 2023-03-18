#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# DESC: 基础handler逻辑

import logging
import tornado.web as web


# class BaseHandler(web.RequestHandler):
#     def __init__(self, application, request, **kwargs):
#         super().__init__(application, request, **kwargs)
#         self.logger = logging.getLogger()
#
#     def set_default_headers(self) -> None:
#         self.set_header("Access-Control-Allow-Origin", "*")
#         self.set_header("Access-Control-Allow-Headers", "*")
#         self.set_header('Access-Control-Allow-Methods', "GET,POST,OPTIONS")
