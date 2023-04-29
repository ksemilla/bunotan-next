import { UsersService, login } from "@/api";
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

const SignupPage = () => {
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
      username: (val) => !val && "This is required",
      password: (val) => !val && "This is required",
    },
  });

  const onSubmit = form.onSubmit(async (data: LoginData) => {
    try {
      const res = UsersService.create(data);
      console.log(res);
    } catch (e) {
      logError(e);
    }
  });

  if (isLogged) {
    router.push("/draw-sessions");
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
                Create account
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
                    Submit
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

export default SignupPage;
