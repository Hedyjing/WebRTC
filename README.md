# WebRTC

## WebRTC概述
  > 是什么

    - 音视频处理+即使通讯的开源库
    - 2010年Google将其开源
    - 跨平台
  > 能做什么

    - 音视频实时互动
    - 游戏, 即时通讯, 文件传输...
    - 回音消除, 降噪
## WebRTC架构
如图
## WebRTC目录结构
| 目录 | 功能 |
| ---- | ---- |
| api | WebRTC接口层, 浏览器都是通过该接口调用WebRTC |
| call | 数据流的管理层, Call代表同一个断点的所有数据的流入流出 |
| video | 与视频相关的逻辑 |
|audio|与音频相关的逻辑|
|common_audio|音频算法相关|
|common_video|视频算法相关|
|media|与多媒体相关的逻辑处理, 如编解码的逻辑处理|
|logging|日志相关|
|module|最重要的目录, 子模块|
|pc|Peer Connection, 连接相关的逻辑层|
|p2p|端对端相关代码, stun, turn|
|rtc_base|基础代码, 如线程, 锁相关的统一接口代码|
|rtc_tool|音视频分析相关的工具代码|
|tool_webrtc|WebRTC测试相关的工具代码, 如网络模拟器|
|system_wrappers|与具体操作系统相关的代码. 如CPU特性, 原子操作等|
|stats|存放各种数据统计相关的类|
|sdk|存放Android和IOS层代码. 如视频的采集, 渲染等|
> WebRTC Modules目录

|目录|功能|
|---|---|
|audio_coding|音频编解码相关代码|
|audio_device|音频采集与音频播放相关代码|
|audio_mixer|混音相关代码|
|audio_processing|音频前后处理的相关代码|
|bitrate_controller|码率控制相关代码|
|congestion_controller|流控制相关代码|
|desktop_capture|桌面采集相关代码|
|pacing|码率探测及平滑处理相关的代码|
|remote_bitrate_estimator|远端码率估算相关代码|
|rtp_rtcp|rtp/rtc协议相关代码|
|video_capture|视频采集相关代码|
|video_coding|视频编解码相关代码|
|video_processing|视频前后处理相关代码|

## WebRTC运行机制
> 轨与流
> 重要类
  - MediaStream
  - RTCPeerConnection
    - 调用过程
  - RTCDataChannel
## Web服务器搭建
  > Web服务器选型
    - Nodejs
    - Nginx
    - Apache
  > Nodejs工作原理
  > 最简单的http服务

    - require引入http模块
    - 创建http服务
    - 侦听端口
    - 启动Nodejs服务
      - node app.js
      - nohub node app.js &
      - forever start server.js
        - forever stop server.js
  > 创建https服务

    > HTTP + TLS/SSL
    - 生成HTTPS证书
    - 引入HTTPS模块
    - 指定证书位置, 并创建HTTPS服务
  > 实现一个最终的Web服务器

    - 引用express模块
      - web服务框架
    - 引入 serve-index模块
      - 发布整个目录
    - 指定发布目录
## 获取音视频设备
  - navigator.mediaDevices.enumerateDevices();  // 返回一个promise对象
  - MediaDevicesInfo   // then 成功回调的函数的参数类型
    |属性 | 说明 |
    |---|---|
    |deviceID|设备ID|
    |label|设备的名字|
    |kind|设备的种类|
    |groupID|两个设备groupID相同， 说明是同一个物理设备|
## 采集音视频数据
  > API
    - navigator.mediaDevices.getUserMedia(constraints) // 返回promise
      - getUserMedia
      - webkitGetUserMedia
      - mozGetUserMedia
    - MediaStreamConstraints
  > adapter适配不同浏览器的WebRTC API