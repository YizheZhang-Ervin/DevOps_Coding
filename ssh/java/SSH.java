public class SSH{
        public static void main(String[] args){

                SSHClient sshClient = SSHJUtils.genSSHClient("xxName", "xxPwd", "xxAddress");
                SSHJUtils.doSFTPUpload(sshClient, "/xxLocalpath", "/xxRemotepath");

                List<String> commandList = Lists.newArrayList("ls -al","pwd");
                String result = SSHJUtils.doExecCommand(sshClient, commandList);
                SSHJUtils.close(sshClient);
        }
}



