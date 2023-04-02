#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# DESC: 用户信息model

from datetime import datetime
from peewee import IntegerField, CharField, DateTimeField

from init import DB_cn


class User(DB_cn.Model):
    # 字段保持和数据库一致
    Id = IntegerField(column_name="id")
    Account = CharField(column_name="account")
    Password = CharField(column_name="password")
    Role = IntegerField(column_name="role")
    Status = IntegerField(column_name="status")
    CreatedAt = DateTimeField(column_name="created_at")
    UpdatedAt = DateTimeField(column_name="updated_at")

    class Meta:
        db_table = "users"

    @classmethod
    def get_row(cls, account):
        return cls.get_or_none(cls.Account == account)

    @classmethod
    def add_one(cls, account, passwd, role=1, status=1):
        curr = datetime.now()
        user = cls.insert(Account=account, Password=passwd,
                          Role=role, Status=status,
                          CreatedAt=curr, UpdatedAt=curr).execute()
        return user.Id

    @classmethod
    def update_by_id(cls, user_id, data):
        res = cls.update(**data).where(cls.Id == user_id).execute()
        return res
