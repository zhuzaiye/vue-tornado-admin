#!/usr/bin/env python3
# _*_ coding: utf-8 _*_

"""
AUTHOR: CodeMax
LICENSE: MIT License
DATE: 2023/7/11 22:33
DEAS: 
"""

import datetime
import random

from handlers.base_handler import BaseHandler


class TableHandler(BaseHandler):
    def get(self):
        items = []
        for i in range(20):
            items.append({
                "id": i + 1,
                "title": f"sentence_{i + 1}",
                "status": random.choice(['published', 'draft', 'deleted']),
                "author": "name",
                "display_time": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "pageviews": 500
            })
        self.write_ok({
            "total": len(items),
            "items": items
        })