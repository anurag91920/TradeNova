import { Client } from 'ssh2';
import fs from 'fs';
import net from 'net';

export const createSSHTunnel = () => {
  return new Promise((resolve, reject) => {
    const sshClient = new Client();
    
    let privateKey;
    try {
      privateKey = fs.readFileSync(process.env.SSH_KEY_PATH || '/etc/secrets/ssh_key');
    } catch (err) {
      console.error('❌ Could not read SSH key:', err.message);
      return reject(err);
    }
    
    sshClient.on('ready', () => {
      console.log('✅ SSH Tunnel Connected to Hostim.dev Bastion');
      
      const server = net.createServer((sock) => {
        sshClient.forwardOut(
          '127.0.0.1',
          12345,
          process.env.DB_HOST || 'tradenova-mysql.hpr-025bdf26.svc',
          parseInt(process.env.DB_PORT) || 3306,
          (err, stream) => {
            if (err) {
              console.error('SSH Forward Error:', err.message);
              sock.end();
              return;
            }
            sock.pipe(stream).pipe(sock);
          }
        );
      });
      
      server.listen(3307, '127.0.0.1', () => {
        console.log('✅ SSH Tunnel listening on 127.0.0.1:3307');
        resolve(server);
      });
    });
    
    sshClient.on('error', (err) => {
      console.error('❌ SSH Tunnel Error:', err.message);
      reject(err);
    });
    
    sshClient.connect({
      host: process.env.SSH_HOST || 'ssh.eu-center.hostim.dev',
      port: 22,
      username: process.env.SSH_USER || 'hpr-025bdf26',
      privateKey: privateKey,
      readyTimeout: 30000,
    });
  });
};