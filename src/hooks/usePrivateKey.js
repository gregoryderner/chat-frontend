import { useEffect, useState } from 'react';
import { importPrivateKey } from '../utils/crypto';

const usePrivateKey = () => {
  const [privateKey, setPrivateKey] = useState(null);

  useEffect(() => {
    const loadPrivateKey = async () => {
      const storedPrivateKey = localStorage.getItem('privateKey');
      if (storedPrivateKey) {
        const importedPrivateKey = await importPrivateKey(storedPrivateKey);
        setPrivateKey(importedPrivateKey);
      }
    };
    loadPrivateKey();
  }, []);

  return privateKey;
};

export default usePrivateKey;
