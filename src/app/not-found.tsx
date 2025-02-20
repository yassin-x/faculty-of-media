import BadRequest from "@/components/BadRequest";
import React from "react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <BadRequest
        link="/"
        httpStatusCode="404"
        subTitle="Sorry, the page you visited does not exist."
      />
    </div>
  );
}
