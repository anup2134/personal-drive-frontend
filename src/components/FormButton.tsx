import { Button } from "@/components/ui/button";
export default function FormButton({
  disabled,
  handleSubmit,
  loading,
  name = "Create Account",
}: {
  disabled: boolean;
  loading: boolean;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  name: string;
}) {
  return (
    <Button
      className="py-5 mt-2 w-full hover:cursor-pointer"
      disabled={disabled}
      onClick={handleSubmit}
    >
      {loading ? (
        <div className="w-5 h-5 rounded-full border-l-2 border-r-2 border-t-2 border-black animate-spin"></div>
      ) : (
        <p>{name}</p>
      )}
    </Button>
  );
}
