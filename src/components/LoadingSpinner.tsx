import Image from "next/image";

export const LoadingSpinner = () => {
  return (
    <Image
      src={"/icon/loading-spinner.png"}
      alt="loading_spinner"
      width={36}
      height={36}
      className="animate-spin"
    />
  );
};
