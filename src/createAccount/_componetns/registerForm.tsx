// RegisterForm.tsx
// The RegisterForm component renders a user registration form with fields for username, email, password, and profile photo.
// It validates input using Zod schema and handles form submission to register a new user via an API.

// Import necessary components and libraries
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import useFetch from "@/lib/use-http";
import { ImageUpload } from "@/components/image-upload.tsx";

// Define the validation schema using Zod
const RegisterSchema = z.object({
  name: z.string().min(2, { message: "Username is required" }),
  email: z.string().email(),
  password: z.string().min(4),
  avatar: z.any().optional(), // 可选文件类型
});

// RegisterForm component - renders the user registration form
export const RegisterForm = () => {
  const { fetchData, loading } = useFetch();

  // Initialize the form with default values and validation
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    const res = await fetchData("auth/register", "POST", data);// Change the endpoint or method here if needed
    console.log(res);
    if (res) {
      toast.success("User registered successfully"); // Modify the success message here if needed
      form.reset(); // Reset the form fields after successful registration
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Provide form context */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-y-6"
        >
          {/* Username */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Avatar Upload */}
          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Photo</FormLabel>
                <FormControl>
                  <div>
                    <ImageUpload
                      value={field.value}
                      onChange={field.onChange}
                      onRemove={() => field.onChange("")}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button disabled={loading} type="submit" className="w-full">
              Create User
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
