import net.schmizz.sshj.SSHClient;
import net.schmizz.sshj.common.IOUtils;
import net.schmizz.sshj.connection.channel.direct.Session;
import net.schmizz.sshj.sftp.SFTPClient;
import net.schmizz.sshj.transport.verification.PromiscuousVerifier;
import net.schmizz.sshj.xfer.FileSystemFile;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class SSHJUtils {

    /**
     * 创建SSHJ连接
     *
     * @param userName
     * @param password
     * @param localIp
     * @return
     * @throws IOException
     */
    public static SSHClient genSSHClient(String userName, String password, String localIp) throws IOException {
        localIp = localIp.trim();
        SSHClient ssh = new SSHClient();
        //ssh.loadKnownHosts();
        // 跳过密钥验证
        ssh.addHostKeyVerifier(new PromiscuousVerifier());
        // 传入主机名或IP地址建立连接
        ssh.connect(localIp);
        // 通过用户名和密码进行验证
        ssh.authPassword(userName, password);
        return ssh;
    }

    /**
     * 创建Session
     *
     * @param sshClient
     * @return
     * @throws Exception
     */
    public static Session getSession(SSHClient sshClient) throws Exception {
        Session session = sshClient.startSession();
        return session;
    }

    /**
     * 执行命令
     *
     * @param sshClient
     * @param command
     * @return
     * @throws Exception
     */
    public static String doExecCommand(SSHClient sshClient, String command) throws Exception {
        Session session = getSession(sshClient);
        Session.Command cmd = session.exec(command);
        // 获取命令的执行结果
        String response = IOUtils.readFully(cmd.getInputStream()).toString();
        return response;
    }

    public static String doExecCommand(SSHClient sshClient, List<String> commands) throws Exception {
        return doExecCommand(sshClient, commands.stream().collect(Collectors.joining(";")));
    }

    /**
     * SFTP 上传文件
     *
     * @param ssh
     * @param localFilePath
     * @param remoteDirectory
     * @throws Exception
     */
    public static void doSFTPUpload(SSHClient ssh, String localFilePath, String remoteDirectory) throws Exception {
        try (SFTPClient sftp = ssh.newSFTPClient()) {
            sftp.put(new FileSystemFile(localFilePath), remoteDirectory);
        }
    }

    /**
     * SFTP 下载
     *
     * @param ssh
     * @param localFileDirectory
     * @param linuxFilePath
     * @throws Exception
     */
    public static boolean doSFTPDownload(SSHClient ssh, String localFileDirectory, String linuxFilePath) {
        try (SFTPClient sftp = ssh.newSFTPClient()) {
            sftp.get(linuxFilePath, localFileDirectory);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * 关闭Sessiono
     *
     * @param session
     * @throws Exception
     */
    public static void close(Session session) throws Exception {
        if (Objects.nonNull(session)) {
            session.close();
        }
    }

    /**
     * 关闭客户端连接
     *
     * @param sshClient
     * @throws Exception
     */
    public static void close(SSHClient sshClient) throws Exception {
        if (Objects.nonNull(sshClient)) {
            sshClient.close();
        }
    }
}