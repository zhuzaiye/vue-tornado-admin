#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# DESC: 配置

import configparser


class ConfigParse:
    def __init__(self, conf_path):
        self.conf_path = conf_path
        self._load_conf()

    def _load_conf(self):
        self.conf = configparser.ConfigParser()
        self.conf.read(self.conf_path)

    def get_sections(self):
        return self.conf.sections()

    def get_section_value(self, section, option):
        return self.conf.get(section, option)

    def get_section_float(self, section, option):
        return self.conf.getfloat(section, option)

    def get_section_int(self, section, option):
        return self.conf.getint(section, option)

    def get_section_bool(self, section, option):
        return self.conf.getboolean(section, option)
