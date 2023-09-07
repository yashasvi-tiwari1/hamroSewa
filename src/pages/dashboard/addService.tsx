import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IconCircleChevronRight } from "@tabler/icons-react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddService: React.FC<DialogProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const [description, setDescription] = useState("");
  const cancelButtonRef = useRef(null);
  const handle_description = (e: any) => {
    setDescription(e.target.value);
  };
  const [image, setImage] = useState("");

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        static
        onClose={onClose} // Use the onClose prop to close the dialog
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle  sm:w-max sm:max-h-2xl sm:h-full pr-14 ">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center -mt-1 justify-center h-12 w-12 rounded-full bg-teal-200 sm:mx-0 sm:h-10 sm:w-10">
                    <IconCircleChevronRight
                      className="h-6 w-6 text-teal-700"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-semibold leading-6 text-gray-900 w-max"
                    >
                      Add Services
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Please fill out the form with proper data.
                      </p>
                    </div>
                    <div className="mt-6">
                      <label className="font-semibold w-full">
                        Service Name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          className="w-full border rounded-md  px-3 py-2"
                          placeholder="Enter service name"
                        />
                      </div>
                    </div>
                    <div className="mt-6">
                      <label className="font-semibold">Description</label>
                      <div className="mt-2">
                        <textarea
                          className="w-full border rounded-md px-3 py-2"
                          rows={3}
                          placeholder="Please enter the details of your service"
                          onChange={handle_description}
                        />
                      </div>
                    </div>
                    <div className="mt-6">
                      <label className="font-semibold">Choose an image</label>
                      <div className="mt-2 ">
                        <input
                          type="file"
                          id="image"
                          name="image"
                          accept="image/*"
                          className="w-full rounded-lg"
                          onChange={handleImageChange}
                        />
                      </div>
                      {image && (
                        <div className="mt-2">
                          <img
                            src={image}
                            alt="Selected Image"
                            className="max-w-xs mx-auto"
                          />
                        </div>
                      )}
                    </div>
                    <div className=" sm:flex sm:flex-row-reverse gap-4 mt-10 -mr-10">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-800 sm:ml-3 sm:w-auto"
                        // onClick={bookVendor}
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-700 sm:mt-0 sm:w-auto"
                        onClick={onClose} // Use the onClose prop to close the dialog
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AddService;
