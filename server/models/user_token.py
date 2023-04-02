#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# DESC: 用户登录令牌model

from datetime import datetime, timedelta

from peewee import IntegerField, CharField, DateTimeField
from init import DB_cn


class UserToken(DB_cn.Model):
    UserId = IntegerField(column_name="user_id", primary_key=True)
    Token = CharField(column_name="token")
    ExpireAt = DateTimeField(column_name="expire_at")
    CreatedAt = DateTimeField(column_name="created_at")
    UpdatedAt = DateTimeField(column_name="updated_at")

    class Meta:
        db_table = "user_token"

    @classmethod
    def get_one(cls, user_id):
        return cls.get_or_none(cls.UserId == user_id)

    @classmethod
    def save_one(cls, user_id, token):
        row = cls.get_one(user_id)

        if row is None:
            curr = datetime.now()
            user = cls.insert(UserId=user_id, Token=token,
                              ExpireAt=datetime.now() + timedelta(days=3),
                              CreatedAt=curr, UpdatedAt=curr).execute()
            return user.UserId
        else:
            cls.update(Token=token, ExpireAt=datetime.now() + timedelta(days=3), UpdatedAt=datetime.now()).where(
                cls.UserId == user_id).execute()

    @classmethod
    def del_one(cls, user_id):
        cls.delete().where(cls.UserId == user_id).execute()


if __name__ == '__main__':
    UserToken.save_one(1, "123")
