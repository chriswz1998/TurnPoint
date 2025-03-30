import GradientBackgroundContainer from "@/components/GradientBackgroundContainer";
import { PhotoIcon } from "@heroicons/react/24/outline";

const CreateUserPage = () => {
  return (
    <GradientBackgroundContainer className="bg-white w-full h-full py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold text-indigo-600">
            Create a New User
          </h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
            Fill in the form to create a user
          </p>
          <p className="mt-6 text-lg text-gray-600">
            Enter the user's details, including username, email, password, and profile photo.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24">
          <form className="grid grid-cols-1 gap-y-6">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-gray-700">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            {/* Profile Photo */}
            <div>
              <label className="block text-gray-700">Profile Photo</label>
              <div className="flex items-center justify-center mt-2 border-2 border-dashed p-6 rounded-lg">
                <input
                  type="file"
                  id="photo"
                  className="hidden"
                  accept="image/*"
                />
                <label
                  htmlFor="photo"
                  className="cursor-pointer text-indigo-600 flex flex-col items-center"
                >
                  <PhotoIcon className="h-12 w-12 text-indigo-600" />
                  <span className="mt-2 text-sm text-gray-500">
                    Click to select a photo
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                Create User
              </button>
            </div>
          </form>
        </div>
      </div>
    </GradientBackgroundContainer>
  );
};

export default CreateUserPage;
