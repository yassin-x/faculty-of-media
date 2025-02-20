import Form from "./_components/Form";

export default function SignInPage() {
  return (
    <main>
      <div className="py-44 md:py-40 container flex justify-center items-center">
        <div className="w-full max-w-md p-6 bg-card rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center text-primary mb-4">
            Sign In<sup>(Only Admin)</sup>
          </h2>
          <Form />
        </div>
      </div>
    </main>
  );
}
