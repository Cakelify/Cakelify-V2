import InfoIcon from "@mui/icons-material/Info";

const Modal = ({ show, onClose }) => {
  if (!show) return null; // If `show` is false, don't render anything

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white p-8 rounded-lg w-full max-w-md text-center">
        <button
          className="absolute top-2 right-4 text-gray-500 text-2xl focus:outline-none"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="flex mt-3">
          <InfoIcon fontSize="medium" />
          <p className="text-sm ml-2 font-montserrat mb-0 text-slate-500">
            Just a quick note: Cash on Delivery (COD) isn’t available with
            applied coupons. If you prefer COD, simply remove the coupon and
            refresh the page
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
