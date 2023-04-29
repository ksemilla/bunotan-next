import { login } from "@/api";
import { useAuthStore } from "@/stores";
import { LoginData } from "@/types";
import { logError } from "@/utils";
import {
  Box,
  Button,
  Center,
  Container,
  Space,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Cookies from "js-cookie";
import Head from "next/head";
import { useRouter } from "next/router";

const LoginPage = () => {
  const router = useRouter();
  const [isLogged, setIsLogged] = useAuthStore((state) => [
    state.isLogged,
    state.setIsLogged,
  ]);

  const form = useForm<LoginData>({
    initialValues: {
      username: "",
      password: "",
    },

    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      username: (val) => !val && "This is required",
      password: (val) => !val && "This is required",
    },
  });

  const onSubmit = form.onSubmit(async (data: LoginData) => {
    try {
      const res = await login(data);
      Cookies.set("accessToken", res.data.accessToken, {
        // domain: process.env.NEXT_PUBLIC_API_ROOT,
      });
      setIsLogged(true);
    } catch (e) {
      logError(e);
    }
  });

  if (isLogged) {
    router.push("/draw-lots");
    return;
  }

  return (
    <>
      <Head>
        <title>Login - Bunotan</title>
        <meta name="description" content="Login page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center h="100vh">
        <Container w="100%">
          <Box w="400px" m="auto">
            <Center h="">
              <Text fz="30px" fw={700}>
                Welcome back!
              </Text>
            </Center>
            <Space h="40px" />
            <form onSubmit={onSubmit}>
              <Stack spacing="xs">
                <TextInput
                  withAsterisk
                  label="Username"
                  {...form.getInputProps("username")}
                />
                <TextInput
                  withAsterisk
                  label="Password"
                  type="password"
                  {...form.getInputProps("password")}
                />
                <Center>
                  <Button type="submit" w="100%">
                    Login
                  </Button>
                </Center>
              </Stack>
            </form>
          </Box>
        </Container>
      </Center>
    </>
  );
};

export default LoginPage;
