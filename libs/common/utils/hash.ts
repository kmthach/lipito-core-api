import * as crypto from 'crypto';
export const hash = (data: string): string => {
  const md5 = crypto.createHash('md5');
  const sha1 = crypto.createHash('sha1');

  const md5HashPwd = md5.update(data).digest('hex');
  const sha1HashPwd = sha1.update(md5HashPwd).digest('hex');

  return sha1HashPwd;
};
