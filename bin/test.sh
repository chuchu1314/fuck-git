#!/bin/bash

# 获取历史命令总数
history_count=$(history | wc)
echo $history_count

# 调用 Node.js 脚本，并传递数据作为参数
# node bin/echo.cjs "$history_count"