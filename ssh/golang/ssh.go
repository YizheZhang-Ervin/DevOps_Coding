package main

import (
	"log"
	"os"

	"golang.org/x/crypto/ssh"
	"golang.org/x/term"
)

func main() {
	// 设置客户端请求参数
	// var hostKey ssh.PublicKey
	config := &ssh.ClientConfig{
		User: "root",
		Auth: []ssh.AuthMethod{
			ssh.Password("root"),
		},
		// HostKeyCallback: ssh.FixedHostKey(hostKey),
		HostKeyCallback: ssh.InsecureIgnoreHostKey(), // 忽略主机密钥
	}

	// 作为客户端连接SSH服务器
	conn, err := ssh.Dial("tcp", "127.0.0.1:22", config)
	if err != nil {
		log.Fatal("unable to connect: ", err)
	}
	defer conn.Close()

	// 创建会话
	session, err := conn.NewSession()
	if err != nil {
		log.Fatal("unable to create session: ", err)
	}
	defer session.Close()

	// 设置会话的标准输出、错误输出、标准输入
	session.Stdout = os.Stdout
	session.Stderr = os.Stderr
	session.Stdin = os.Stdin

	// 设置终端参数
	modes := ssh.TerminalModes{
		ssh.ECHO:          0,     // disable echoing
		ssh.TTY_OP_ISPEED: 14400, // input speed = 14.4kbaud
		ssh.TTY_OP_OSPEED: 14400, // output speed = 14.4kbaud
	}

	termWidth, termHeight, err := term.GetSize(int(os.Stdout.Fd())) // 获取当前标准输出终端窗口尺寸
	if err != nil {
		log.Fatal("unable to terminal.GetSize: ", err)
	}

	// 设置虚拟终端与远程会话关联
	if err := session.RequestPty("xterm", termHeight, termWidth, modes); err != nil {
		log.Fatal("request for pseudo terminal failed: ", err)
	}

	// 启动远程Shell
	if err := session.Shell(); err != nil {
		log.Fatal("failed to start shell: ", err)
	}

	// 阻塞直至结束会话
	if err := session.Wait(); err != nil {
		log.Fatal("exit error: ", err)
	}
}
