#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# DESC: mysql database 基于peewee的ORM

import peewee
from playhouse.signals import Model  # 作用:
from playhouse.pool import PooledMySQLDatabase


class SqlDB:
    def __init__(self, db_conf: dict):
        self.db = None
        self.config = db_conf
        self.__load_database()
        self.Model = self.get_model_class()

    def __load_database(self):
        db_name = self.config.pop("database")
        self.config.setdefault("max_connections", 8)
        self.config.setdefault("stale_timeout", 300)
        # self.db = peewee.MySQLDatabase(db_name, **self.config)
        # 使用连接池
        self.db = PooledMySQLDatabase(db_name, **self.config)

    def get_model_class(self):
        class BaseModel(Model):
            class Meta:
                database = self.db

        return BaseModel

    def connect(self):
        self.db.connect()

    def close(self):
        self.db.close()
