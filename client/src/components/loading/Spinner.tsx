import { TailSpin } from "react-loader-spinner"

function Spinner() {
  return (
    <TailSpin
  visible={true}
  height="80"
  width="80"
  color="#FFFFFF"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  />
  )
}

export default Spinner