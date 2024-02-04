# pip3 install paramiko 或 sudo apt-get install -y python3-paramiko

import paramiko

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('127.0.0.1', username='root', password='root')

stdin, stdout, stderr = ssh.exec_command('ls')
# _, stdout, _ = ssh.exec_command('ls')

# read读取整个文件，readline读取一行
output = stdout.read().decode()  
print(output)

ssh.close()