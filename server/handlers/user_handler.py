#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# DESC: suer 控制操作
import json

from handlers.base_handler import BaseHandler
from models.user import User
from models.user_token import UserToken
from init import conf
from utils.encrypt import compare_pwd
from utils.encrypt import encrypt_aes


class LoginHandler(BaseHandler):
    @classmethod
    def gen_token(cls, data):
        return encrypt_aes(data, conf.get_section_value("serve", "secret_key"))

    @classmethod
    def check_passwd(cls, enter_pwd, raw_pwd):
        return compare_pwd(enter_pwd, raw_pwd)

    def post(self):
        account = self.get_argument("email", None)
        password = self.get_argument("password", None)
        row = User.get_row(account)

        if row is None or self.check_passwd(password, row.Password) is False:
            self.write_err("账号或者密码错误,也许是账号未注册,请联系管理员")
        else:
            data = json.dumps({"user_id": row.id})
            token = self.gen_token(data)
            UserToken.save_one(row.id, token)
            self.write_ok({"token": token})


class LogoutHandler(BaseHandler):
    def post(self):
        user_id = self.get_user()
        UserToken.del_one(user_id)
        self.write_ok()
