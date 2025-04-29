// Headers.tsx
// The Headers component renders the header section for the "Create New User" page.
// It displays the page title, main heading, and a brief description to guide the user through the process of creating a new user.

// Component that renders the header section for the "Create New User" page
export const Headers = () => {
  return (
    <div className="mx-auto max-w-2xl lg:text-center">
      {/* Section Title */}
      <h2 className="text-base font-semibold text-indigo-600">
        Create a New User
      </h2>
       {/* Main Heading */}
      <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
        Fill in the form to create a user
      </p>
      {/* Description Text */}
      <p className="mt-6 text-lg text-gray-600">
        Enter the user's details, including username, email, password, and
        profile photo.
      </p>
    </div>
  );
};
