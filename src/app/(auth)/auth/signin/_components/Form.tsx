"use client";
import FormFields from "@/components/form-fileds/form-fields";
import { Button } from "@/components/ui/button";
import { Pages, Routes } from "@/constants/enums";
import { toast } from "@/hooks/use-toast";
import useFormFields from "@/hooks/useForm";
import { IFormField } from "@/types/app";
import { LoaderIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

export default function Form() {
  const formRef = useRef(null);
  const router = useRouter();
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { getFormFields } = useFormFields({
    slug: Pages.SIGNIN,
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (res?.error) {
        console.log(res?.error);
        const validationError = await JSON.parse(res?.error).validationError;
        setError(validationError);
        const responseError = await JSON.parse(res?.error).responseError;
        if (responseError) {
          toast({
            title: responseError,
            className: "!text-destructive",
          });
        }
      }
      if (res?.ok) {
        toast({
          title: "Login Success",
          className: "!text-green-400",
        });
        router.replace(`/${Routes.ROOT}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form ref={formRef} onSubmit={onSubmit}>
      {getFormFields().map((field: IFormField) => (
        <div key={field.name} className="mb-4">
          <FormFields {...field} error={error} />
        </div>
      ))}
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? (
          <LoaderIcon className="animate-spin w-4 h-4" />
        ) : (
          <>Submit</>
        )}
      </Button>
    </form>
  );
}
