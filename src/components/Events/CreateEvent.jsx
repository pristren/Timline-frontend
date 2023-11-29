import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateEvent() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [feildError, setFeildError] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [inputData, setInputData] = useState({
    event_name: "",
    event_date: "",
    event_description: "",
    event_image: "",
  });
  const handleFileChange = (e) => {
    let formData = new FormData();
    const maxFileSize = 5 * 1024 * 1024;
    const file = e.target.files[0];
    if (file && file.size > maxFileSize) {
      setError(
        "File size exceeds the maximum allowed size (5MB). Please choose a smaller file."
      );
    } else {
      setError("");
      formData.append("image", file);
      formData.append("key", `${import.meta.env.VITE_IMGBB_API_KEY}`);
      setSelectedFile(file);
      axios.post("https://api.imgbb.com/1/upload", formData).then((res) => {
        setInputData({
          ...inputData,
          event_image: res.data.data.url,
        });
      });
    }
  };
  const handleInputChange = (event) => {
    setInputData((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  const createEvent = (e) => {
    e.preventDefault();
    if (
      inputData?.event_name !== "" &&
      startDate !== null &&
      inputData?.event_description !== ""
    ) {
      const data = {
        ...inputData,
        event_date: format(startDate, "MM/dd/yyyy"),
      };
      setFeildError(false);
      axios
        .post("http://localhost:5000/api/v1/events", data)
        .then((res) => {
          toast.success("Successfully Created Event!");
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex justify-between mx-10 mt-5">
        <div className="[font-family:'Inter-Regular',Helvetica] font-normal text-black text-[32px] tracking-[0] leading-[normal]">
          <Link to={"/"}>Logo</Link>
        </div>
        <div className="cursor-pointer [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[32px] tracking-[0] leading-[normal]">
          <Link to={"/create/event"}>Create Event</Link>
        </div>
      </div>
      <div className="flex items-center h-screen">
        <div className="p-6 bg-white mx-auto rounded-2xl w-full sm:w-3/4 md:w-[60%] lg:w-[45%] shadow-xl ">
          <div className="mb-4 text-center">
            <h3 className="font-semibold text-2xl text-gray-800">
              Create Event{" "}
            </h3>
          </div>
          <form
            onSubmit={createEvent}
            className="px-8 pt-6 pb-8  bg-white rounded"
          >
            <div className="mb-4 md:flex md:justify-between md:gap-4 space-y-2 md:space-y-0">
              <div className="space-y-2 w-full">
                <label className="text-sm font-medium text-gray-700 tracking-wide">
                  Event Name
                </label>
                <input
                  onChange={handleInputChange}
                  name="event_name"
                  className=" w-full text-sm px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                  type="text"
                  placeholder="Enter Event Name"
                />
              </div>
              <div className="space-y-2 relative w-full">
                <label
                  htmlFor="date"
                  className="text-sm font-medium text-gray-700 tracking-wide"
                >
                  Event Date
                </label>
                {/* <input
                  onChange={handleInputChange}
                  name="event_date"
                  id="date"
                  className=" w-full text-sm px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                  type="date"
                  placeholder="Event Date"
                /> */}
                <div className="relative flex items-center !w-full">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    placeholderText="mm/dd/yyyy"
                    // showIcon
                    className=" !py-2 !w-full text-sm !px-4 border  border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                    // icon={
                    //   <div className="absolute right-4 mt-1">
                    //     <svg
                    //       xmlns="http://www.w3.org/2000/svg"
                    //       width="1em"
                    //       height="1em"
                    //       viewBox="0 0 48 48"
                    //     >
                    //       <mask id="ipSApplication0">
                    //         <g
                    //           fill="none"
                    //           stroke="#fff"
                    //           strokeLinejoin="round"
                    //           strokeWidth="4"
                    //         >
                    //           <path
                    //             strokeLinecap="round"
                    //             d="M40.04 22v20h-32V22"
                    //           ></path>
                    //           <path
                    //             fill="#fff"
                    //             d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
                    //           ></path>
                    //         </g>
                    //       </mask>
                    //       <path
                    //         fill="currentColor"
                    //         d="M0 0h48v48H0z"
                    //         mask="url(#ipSApplication0)"
                    //       ></path>
                    //     </svg>
                    //   </div>
                    // }
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <label className="text-sm font-medium text-gray-700 tracking-wide">
                Event Description
              </label>
              <textarea
                onChange={handleInputChange}
                className=" w-full text-sm px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                name="event_description"
                placeholder="Enter Event Description Here"
              />
            </div>
            {selectedFile && (
              <div className="space-y-2 w-full mb-8">
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt=""
                  className="w-[105px] h-[105px]"
                />
              </div>
            )}
            <div className="space-y-2 w-full mb-8">
              <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                Image
              </label>
              <input
                onChange={handleFileChange}
                className="w-full content-center text-sm px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                type="file"
              />
            </div>
            <div className="mb-6 text-center">
              <button
                className="w-full px-4 py-2 font-bold text-white bg-blue-400 rounded-full hover:bg-blue-500 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
