#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# DESC: mysql database 池化连接
from abc import ABC

from peewee import Model
from playhouse.pool import PooledMySQLDatabase
from playhouse.shortcuts import ReconnectMixin


class RetryPooledMysql(ReconnectMixin, PooledMySQLDatabase):
    """实现重连和池化双重机制"""
    _instance = None

    @classmethod
    def get_db_instance(cls, db_config):
        if not cls._instance:
            cls._instance = cls(**db_config)
        return cls._instance

    """
    // 使用该方法避免手动操作断开池连接
    with database.connection_context():
        User.select()
    """


class PeeweeDB:
    def __init__(self, db_conf: dict):
        self.db = None
        self.config = db_conf
        self.init_db()
        self.Model = self.get_model_class()

    def init_db(self):
        # 设置池化参数
        self.config.setdefault("max_connections", 8)
        self.config.setdefault("stale_timeout", 300)
        # 使用连接池
        self.db = RetryPooledMysql.get_db_instance(**self.config)

    def get_model_class(self):
        class BaseModel(Model):
            class Meta:
                database = self.db

        return BaseModel
