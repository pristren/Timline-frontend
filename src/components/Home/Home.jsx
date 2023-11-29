import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import MyModal from "../Modal";

const Home = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  let prevMonth = null;

  let [isOpen, setIsOpen] = useState(false);

  const [likedata, setLikeData] = useState([]);
  const fetchEventData = () => {
    axios.get("http://localhost:5000/api/v1/events").then((res) => {
      setLikeData(res.data);
    });
  };
  useEffect(() => {
    fetchEventData();
  }, []);

  const dropdownRef = useRef(null);
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setSelectedIndex(null);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const elRef = useRef();
  const elRef1 = useRef();
  useEffect(() => {
    const el = elRef.current;
    const el1 = elRef.current;
    if (el) {
      const onWheel = (e) => {
        if (e.deltaY == 0) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY,
          behavior: "smooth",
        });
      };
      el1.addEventListener("wheel", onWheel);
      return () => el1.removeEventListener("wheel", onWheel);
    }
  }, []);

  const [data, setData] = useState({});
  function openModal(res) {
    setData(res);
    setIsOpen(true);
    setSelectedIndex(null);
  }

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex justify-between mx-10 mt-5 -z-20 bg-transparent">
        <div className="[font-family:'Inter-Regular',Helvetica] font-normal text-black text-[32px] tracking-[0] leading-[normal]">
          Logo
        </div>
        <div className="cursor-pointer [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[32px] tracking-[0] leading-[normal]">
          <Link to={"/create/event"}>Create Event</Link>
        </div>
      </div>
      <div
        ref={elRef1}
        className="bg-white flex flex-row justify-center w-full"
      >
        <div className="bg-white w-full xl:w-[1440px] relative">
          <div
            key={elRef}
            id="scrollhorigental"
            ref={elRef}
            className="absolute w-full mx-auto overflow-x-auto overflow-y-hidden min-h-[88vh] "
          >
            {/* eslint-disable */}
            <div
              style={{
                width:
                  likedata?.length > 20
                    ? `${30 + likedata?.length * 55}px`
                    : "1190px",
              }}
              className="absolute h-[30px] bottom-5 left-[80px] bg-orange-400"
            />
            {likedata?.map((res, i) => {
              const isSameMonth =
                dayjs(res?.event_date).format("MMM YYYY") === prevMonth;
              prevMonth = dayjs(res?.event_date).format("MMM YYYY");
              return (
                <div key={i}>
                  <div
                    style={{
                      position: "absolute",
                      width: `10px`,
                      height:
                        res?.likes <= 350 ? `${10 + res?.likes}px` : `360px`,

                      // bottom: "72px",
                      left: `${50 + (i + 1) * 55}px`,
                      background: "black",
                    }}
                    className="bottom-[72px] md:bottom-[50px]"
                  />
                  {
                    <>
                      {res?.event_image && res?.likes >= 15 ? (
                        <img
                          onClick={() => setSelectedIndex(i)}
                          style={{
                            position: "absolute",
                            width: `40px`,
                            height: `40px`,
                            bottom:
                              res?.likes <= 345
                                ? `${60 + res?.likes}px`
                                : `405px`,
                            left: `${34 + (i + 1) * 55}px`,
                            background: "#fb1717",
                            borderRadius: "50px",
                            cursor: "pointer",
                            zIndex: isOpen ? 0 : 99999,
                          }}
                          className="border-2"
                          src={res?.event_image}
                          alt=""
                        />
                      ) : res?.event_image && res?.likes <= 15 ? (
                        <img
                          onClick={() => setSelectedIndex(i)}
                          style={{
                            position: "absolute",
                            width: `40px`,
                            height: `40px`,
                            bottom:
                              res?.likes <= 345
                                ? `${60 + res?.likes}px`
                                : `405px`,
                            left: `${34 + (i + 1) * 55}px`,
                            borderRadius: "50px",
                            cursor: "pointer",
                            zIndex: isOpen ? 0 : 99999,
                          }}
                          className="border-2"
                          src={
                            "https://images.unsplash.com/photo-1605999081451-4436bf1d0d88?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          }
                          alt="fd"
                        />
                      ) : (
                        <div
                          onClick={() => setSelectedIndex(i)}
                          style={{
                            position: "absolute",
                            width: `40px`,
                            height: `40px`,
                            bottom:
                              res?.likes <= 345
                                ? `${60 + res?.likes}px`
                                : `405px`,
                            left: `${34 + (i + 1) * 55}px`,
                            border: "1px solid gray",
                            borderRadius: "50px",
                            cursor: "pointer",
                            zIndex: isOpen ? 0 : 99999,
                          }}
                        />
                      )}
                    </>
                  }
                  {!isSameMonth && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: `-2px`,
                        left: `${35 + (i + 1) * 55}px`,
                        color: "black",
                        fontSize: "10px",
                        zIndex: 99999999,
                      }}
                    >
                      {dayjs(res?.event_date).format("MMM YYYY")}
                    </div>
                  )}

                  {selectedIndex == i && (
                    <div ref={dropdownRef}>
                      <div
                        style={{
                          position: "absolute",
                          width: `164px`,
                          height: `85px`,
                          bottom:
                            res?.likes <= 340
                              ? `${110 + res?.likes}px`
                              : `450px`,
                          left: `${-24 + (i + 1) * 55}px`,
                          background: "#d9d9d9",
                          zIndex: 99999999,
                        }}
                        className="rounded-xl cursor-pointer "
                        onClick={() => {
                          openModal(res);
                        }}
                      >
                        <div
                          className="h-full flex justify-center items-center w-[150px] mx-auto text-center  "
                          style={{
                            zIndex: 999999994,
                          }}
                        >
                          {res?.event_name}
                        </div>
                      </div>

                      <img
                        style={{
                          position: "absolute",
                          width: `22px`,
                          height: `22px`,
                          bottom:
                            res?.likes <= 340
                              ? `${92 + res?.likes}px`
                              : `435px`,

                          left: `${43 + (i + 1) * 55}px`,
                        }}
                        alt="Polygon"
                        src="https://i.ibb.co/vDZBHw1/Polygon-1.png"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {isOpen && (
        <MyModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          data={data}
          setLikeData={setLikeData}
        />
      )}
    </div>
  );
};

export default Home;
