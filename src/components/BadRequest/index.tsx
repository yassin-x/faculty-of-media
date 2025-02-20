import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Result } from "antd";

type HttpStatusCodeType =
  | "404"
  | "403"
  | "500"
  | "success"
  | "error"
  | "info"
  | "warning";

export default function BadRequest({
  httpStatusCode,
  link,
  subTitle,
}: {
  httpStatusCode: HttpStatusCodeType;
  link: string;
  subTitle: string;
}) {
  return (
    <div className="flex flex-col">
      <Result
        status={httpStatusCode}
        title={httpStatusCode}
        subTitle={subTitle}
      />
      <Link
        href={link}
        className={`text-lg ${buttonVariants({ variant: "default" })}`}
      >
        Go Back Home
      </Link>
    </div>
  );
}
