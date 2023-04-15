import { useState, useEffect } from "react";
import { openSession, findKeys } from "./pkcs11"; // pkcs11是用于操作PKCS#11库的代码

const pkcs11Template = {
  token: true,
  sensitive: true,
  class: "PRIVATE_KEY",
  keyType: "RSA",
  id: new Uint8Array([0x01, 0x02, 0x03, 0x04]),
  extractable: false
};

export function useToken(pin) {
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!pin) {
      // 如果没有输入PIN码，则不进行读取操作
      setToken(null);
      return;
    }

    setLoading(true);
    setError(null);

    async function readToken() {
      try {
        const session = await openSession(pin); // 打开会话
        const keys = await findKeys(session, pkcs11Template); // 查找私钥
        if (keys.length > 0) {
          setToken(keys[0]); // 保存私钥
        } else {
          setToken(null);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    readToken();
  }, [pin]);

  return [token, error, loading];
}
