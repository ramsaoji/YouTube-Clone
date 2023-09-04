import { TailSpin } from "react-loader-spinner";

const Spinner = () => {
  return (
    <TailSpin
      height="50"
      width="50"
      color="red"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};

export default Spinner;
