type ErrorMessageProps = {
  className?: string;
  message: string;
  trigger: boolean;
};

const ErrorMessage = ({ className, message, trigger }: ErrorMessageProps) => {
  const Error = "p";
  return <>{trigger && <Error className={className}>{message}</Error>}</>;
};
ErrorMessage.displayName = "ErrorMessage";

export default ErrorMessage;
