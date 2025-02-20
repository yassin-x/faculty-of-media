import React from "react";

export default function MainHeading({
  title,
  subTitle,
}: {
  title: string;
  subTitle?: string;
}) {
  return (
    <div className="py-6 md:py-8 text-center">
      <h2 className="text-3xl font-semibold text-primary mb-4 italic">
        {title}
      </h2>
      {subTitle && <p className="text-accent">{subTitle}</p>}
    </div>
  );
}
