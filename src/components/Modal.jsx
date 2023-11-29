/* eslint-disable react/prop-types */
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { Fragment } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function MyModal({ isOpen, setIsOpen, data, setLikeData }) {
  function closeModal() {
    setIsOpen(false);
  }
  const fetchEventData = () => {
    axios.get("http://localhost:5000/api/v1/events").then((res) => {
      setLikeData(res.data);
    });
  };
  const handleLike = (id, total) => {
    axios
      .put(`http://localhost:5000/api/v1/events/update/${id}`, {
        likes: total + 1,
      })
      .then((res) => {
        if (res) {
          toast.success("Successfully Liked!");
          fetchEventData();
          setIsOpen(false);
        }
      });
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/75" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto mt-24">
            <div className="flex min-h-min items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl h-full transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all !z-[999999999] text-center">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Event Name : {data?.event_name}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {data?.event_description}
                    </p>
                  </div>
                  <div className="mt-4 w-3/4 mx-auto">
                    <img
                      className="w-2/4 mx-auto"
                      src={data?.event_image}
                      alt=""
                    />
                  </div>

                  <div className="mt-8 flex gap-4 justify-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-8 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => handleLike(data?._id, data?.likes)}
                    >
                      Like it!
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-8 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Close!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
