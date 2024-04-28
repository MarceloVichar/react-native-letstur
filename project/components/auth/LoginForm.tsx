import { Button, Icon, Input } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { loginSchema } from '../../schemas/auth';
import { useAuthStore } from '../../stores/authStore';

export default function LoginForm() {
  const [credentials, setCredentials] = useState({
    email: 'company_operator@letsgrow.com.br',
    password: '12345678',
  });
  const [sending, setSending] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const { handleLogin: storeHandleLogin } = useAuthStore();

  useEffect(() => {
    const result = loginSchema.safeParse(credentials);
    setIsValid(result.success);
  }, [credentials]);

  const handleLogin = async () => {
    setSending(true);

    await storeHandleLogin(credentials).finally(() => {
      setSending(false);
    });
  };

  return (
    <View className="flex-1">
      <Input
        placeholder="Digite seu email"
        label="Email"
        className="w-full"
        leftIcon={<Icon name="email" />}
        value={credentials.email}
        onChangeText={(email) => setCredentials((prev) => ({ ...prev, email }))}
      />
      <Input
        placeholder="Digite sua senha"
        label="Senha"
        secureTextEntry
        className="w-full"
        leftIcon={<Icon name="password" />}
        value={credentials.password}
        onChangeText={(password) => setCredentials((prev) => ({ ...prev, password }))}
      />
      <Button
        disabled={!isValid || sending}
        loading={sending}
        radius="sm"
        type="solid"
        color="primary"
        onPress={handleLogin}>
        Entrar
      </Button>
    </View>
  );
}
