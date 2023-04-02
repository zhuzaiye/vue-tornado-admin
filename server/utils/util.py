#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# DESC:


def to_utf8_bytes(s: str):
    return s.encode("utf8")


def utf8_bytes_to_str(bs: bytes):
    return bs.decode("utf8")