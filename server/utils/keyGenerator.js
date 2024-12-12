import crypto from 'crypto';

export async function generateAccessKey() {
  const buffer = crypto.randomBytes(32);
  return buffer.toString('base64');
}