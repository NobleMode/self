import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { config } from 'dotenv';
config();

@Injectable()
export class CryptoService {
  private algorithm = 'aes-256-ctr';
  private secretKey = process.env.SECRET_KEY;
  private iv = this.checkIV();

encrypt(text: string): string {
    const cipher = crypto.createCipheriv(this.algorithm, this.secretKey, this.iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return encrypted;
}

  decrypt(hash: string): string {
    const decipher = crypto.createDecipheriv(this.algorithm, this.secretKey, this.iv);
    let decrypted = decipher.update(hash, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    console.log(decrypted);
    return decrypted;
  }

  checkIV () {
    const ivHex = process.env.IV;
    if (!ivHex) {
        throw new Error('IV is not defined');
    }
    if (!/^[\da-f]{32}$/i.test(ivHex)) {
        throw new Error('IV is not a valid 16-byte hexadecimal string');
    }

    const iv = Buffer.from(ivHex, 'hex');
    console.log(iv);

    return iv;
  }
}