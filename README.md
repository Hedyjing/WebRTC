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

  > getUserMedia视频参数约束

    - width
    - height
    - aspectRatio(分辨率)
    - frameRate(帧率)
    - facingMode(值为字符串形式)
      - user: 前置摄像头
      - environment: 后置摄像头
      - left: 前置左侧摄像头
      - right: 前置右侧摄像头
    - resizeMode(裁剪)
  > getUserMedia音频参数约束

    - volume(音量0-1.0)
    - sampleRate(采样率)
    - sampleSize(采样大小, 一般16位)
    - echoCancellation(true | false 回音消除)
    - autoGainControl(自动增益)
    - noiseSupperssion(降噪)
    - latency(延迟大小, 设置小, 通讯延迟小, 但质量不佳)
    - channelCount(单声道|双声道)
    - deviceID
    - groupID
  > 视频特效

    > CSS filter, -webkit-filter/filter
    > 将video和filter关联
    > OpenGL/Metal/
    > 支持的特效种类

  |特效|说明|特效|说明|
  |---|---|---|---|
  |grayscale|灰度|opacity|透明度|
  |sepia|褐色|brightness|亮度|
  |saturate|饱和度|contrast|对比度|
  |hue-rotate|色相旋转|blur|模糊|
  |invert|反色|drop-shadow|阴影|

  > 从视频中获取图像

    - 利用canvas
  > 只采集音频数据

    - audio标签.srcObject = stream
  > MidiaStream API及获取视频约束

    - MediaStream.addTrack() // 从媒体流中加入不同的轨
    - MediaStream.removeTrack()  // 从媒体流中移除轨
    - MediaStream.getVideoTracks()  // 拿到视频轨
    - MediaStream.getAudioTracks()  // 拿到音频轨
    - MediaStream.stop()  // 关闭媒体流
    --------
    - MediaStream.onaddtrack //添加媒体轨到流中时触发的事件
    - MediaStream.onremovetrack // 同理
    - MediaStream.onended // 流结束时的事件

## WebRTC录制媒体流

  > MediaRecorder

    基本格式: 
      new MediaRecorder(stream[,options])
    参数: 
      stream可以从getUserMedia, <video>, <audio>或<canvas>获取
      options: 
        - mimeType
          - video/webm
          - audio/webm
          - video/webm;codecs=vp8
          - video/webm;codecs=h264
          - audio/webm;codecs=opus
        - audioBitsPerSecond 音频码率
        - videoBitsPerSecond 视频码率
        - bitsPerSecond 整体码率
      API: 
        - MediaRecorder.start(timeslice)
          - 开始录制, timeslice是可选的, 如果设置了会按时间切片存储数据
        - MediaRecorder.stop()
          - 停止录制, 此时会触发包括最终Blob数据的dataavailabel事件
        - MediaRecorder.pause() 暂停
        - MediaRecorder.resume() 恢复录制
        - MediaRecorder.isTypeSupported() 检查支持格式
      事件: 
        - MediaRecorder.ondataavailable
          - 每次记录一定时间的数据时会定期触发
        - MediaRecorder.onerror
          - 发生错误事触发
      存储数据方式: 
        1. 字符串
        2. Blob
        3. ArrayBuffer
        4. ArrayBufferView

## 采集屏幕数据

  > getDisplayMedia

    基本格式: 
      navigator.mediaDevices.getDisplayMedia(constraints)
      constraints与getUserMedia中的constraints一致
    设置chrome
      chrome://flags
    把client.js中的getUserMedia全部替换为getDisplayMedia
## WebRTC信令服务器实现

  > Socket.IO服务端发送消息

    - 给本次连接发送消息
      - socket.emit()
    - 给某个房间内所有人发消息
      - io.in(room).emit() // io表示一个节点(所有人都在),in表示进入某个房间内
    - 除本连接外, 给某个房间内所有人发消息
      - socket.to(room).emit()
    - 除本连接外, 给所有人发消息(该站点, 可能很多房间)
      - socket.broadcast.emit()

  > Socket.IO客户端处理消息

    - 发送action命令
      S: socket.emit('action')
      C: socket.on('action', function(){...})
    - 发送action命令, 还有data数据
      S: socket.emit('action', data)
      C: socket.on('action', function(data){...})
    - 发送action命令, 有两个数据
      S: socket.emit('action', arg1, arg2)
      C: socket.on('action', function(arg1, arg2){...})
    - 发送action命令, emit总包含回调函数
      S: socket.emit('action', data, function(arg1, arg2) {...})
      C: socket.on('action', function(data, fn){fn('a', 'b')})

  > 信令服务器原理

    - socket.io是WebSocket的超集
    - socket.io有房间的概念
      > socket.io的房间服务器和信令服务器在同一服务器上
      1. 房间服务器
      2. 信令服务器
      3. 流媒体中转
    - socket.io跨平台, 跨终端, 跨语言
  > 信令服务器的实现

    - 安装socket.io
    - 引入socket.io
    - 处理connection消息