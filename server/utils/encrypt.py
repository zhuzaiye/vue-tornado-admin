#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# DESC: 加密处理

import bcrypt
import base64
from Crypto.Cipher import AES

from utils.util import to_utf8_bytes, utf8_bytes_to_str


# 输入原始的密码字符串, 返回加密后的code字符串
def encrypt_pwd(input_pwd):
    # 加密结果为bytes类型
    pwd_code_bytes = bcrypt.hashpw(input_pwd.encode('utf8'), bcrypt.gensalt())
    pwd_code_str = pwd_code_bytes.decode("utf8")
    return pwd_code_str


# 将输入的密码转成bytes 和 已经有的数据库中加密密码转bytes 进行比对
def compare_pwd(input_pwd, encrypt_pwd_str):
    try:
        compare_result = bcrypt.checkpw(input_pwd.encode(), encrypt_pwd_str.encode('utf-8'))
        return compare_result
    except:
        return False


def encrypt_aes(payload, secret_key):
    pad = lambda s: s + (AES.block_size - len(s) % AES.block_size) * chr(AES.block_size - len(s) % AES.block_size)
    iv = secret_key[:AES.block_size]  # initialization vector
    cipher = AES.new(to_utf8_bytes(secret_key), AES.MODE_CBC, to_utf8_bytes(iv))
    encrypted_payload = cipher.encrypt(pad(payload).encode())
    return utf8_bytes_to_str(base64.b64encode(to_utf8_bytes(iv) + encrypted_payload))


def decrypt_aes(token, secret_key):
    unpad = lambda s: s[:-ord(s[-1:])]
    decoded_token = base64.b64decode(token)
    iv = decoded_token[:AES.block_size]
    cipher = AES.new(to_utf8_bytes(secret_key), AES.MODE_CBC, iv)
    payload = unpad(cipher.decrypt(decoded_token[AES.block_size:])).decode()
    return payload
