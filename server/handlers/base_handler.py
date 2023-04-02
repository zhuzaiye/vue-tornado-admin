#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# DESC: 基础handler逻辑

import logging
import json
import tornado.web as web

from init import conf
from utils.encrypt import decrypt_aes


class BaseHandler(web.RequestHandler):
    def __init__(self, application, request, **kwargs):
        super().__init__(application, request, **kwargs)
        self.logger = logging.getLogger()

    def set_default_headers(self) -> None:
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'GET,PUT,DELETE,POST,HEAD,OPTIONS')

    def _initialize(self) -> None:
        self.set_default_headers()

    def write_err(self, err_msg=None):
        if err_msg is None:
            err_msg = "应用或参数错误"
        self.write(json.dumps({"code": 200, "msg": err_msg, "data": {}}))

    def write_ok(self, data=None):
        if data is None:
            data = {}
        self.write(json.dumps({"code": 200, "msg": "ok", "data": data}))

    def get_user(self):
        headers = self.request.headers
        if "Authorization" not in headers:
            return

        token = headers["Authorization"]
        payload = decrypt_aes(token, conf.get_section_value("serve", "secret_key"))
        user_info = json.loads(payload)
        return user_info["user_id"]
