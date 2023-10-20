import React from "react";

type FormProps = React.JSX.IntrinsicElements["form"];
export default function Form({ action, ...props }: FormProps) {
  return <form action={action?.valueOf} method="POST" {...props} />;
}
