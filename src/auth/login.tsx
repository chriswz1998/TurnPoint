// Login.tsx
// This page provides the user login form, including email and password fields.
// It authenticates the user against the API, stores the access token upon success,
// updates the authentication context, and redirects the user to the dashboard.

// Test user credentials
// Username: test@example.com
// Password: 1122

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useFetch from "@/lib/use-http.ts";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth, UserProps } from "@/context/AuthContext.tsx";
import logo from "../assets/logo.svg";

// Interface for the response data from the login API, which includes user info and an access token.
interface ResponesProps extends UserProps {
  access_token: string;
}

// Form validation schema using zod
const FormSchema = z.object({
  email: z.string().min(2, {
    message: "email is required.",
  }),
  password: z.string().min(4, {
    message: "password is required.",
  }),
});

export const Login = () => {
  const { setUser } = useAuth(); // Get the function to set user in the AuthContext
  const { loading, fetchData } = useFetch();  // Fetch function from the custom hook
  const navigate = useNavigate(); // React Router's navigate function

  // Form initialization with react-hook-form and schema validation
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "test@example.com",
      password: "1122",
    },
  });

    // Form submission handler
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Form data:", data);   // Log the form data to verify the input values
    const res = await fetchData<z.infer<typeof FormSchema>, ResponesProps>(
      "auth/login",
      "POST",
      data,
    );
    console.log("Login response:", res);  // Log the response from the API for debugging
    if (res && res.access_token) {
      localStorage.setItem("access_token", res?.access_token);  // Save the access token in localStorage
      setUser(res); // Update the user context with the response data
      toast.success("Login successfully!"); // Display success message
      navigate("/dashboard"); // Redirect to the dashboard after successful login
    }
  }

  return (
    <div className="flex w-full h-full sm:bg-custom-bg md:bg-custom-bg lg:bg-none">
      <div className="min-h-screen w-1/2 bg-white px-6 mx-auto flex flex-col items-center">
        {/* Logo image centered at the top */}
        <img src={logo} alt="Logo" className="self-center" />
        {/* Form container centered in the middle */}
        <div className="flex-1 w-full flex items-center justify-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-4/5 space-y-3"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={loading} type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center sm:hidden md:hidden lg:block bg-custom-bg bg-cover bg-center" />
    </div>
  );
};
