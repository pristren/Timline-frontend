import { useEffect, useRef, useState } from "react";

const Home = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  let prevMonth = null;
  const likedata = [
    {
      month: "Jan",
      like: 100,
    },
    {
      month: "Jan",
      like: 150,
    },
    {
      month: "Feb",
      like: 200,
    },
    {
      month: "Feb",
      like: 250,
    },
    {
      month: "Feb",
      like: 300,
    },
    {
      month: "Mar",
      like: 50,
    },
    {
      month: "Apr",
      like: 110,
    },
    {
      month: "Apr",
      like: 40,
    },
    {
      month: "Apr",
      like: 100,
    },
    {
      month: "May",
      like: 100,
    },
    {
      month: "May",
      like: 60,
    },
    {
      month: "Jun",
      like: 300,
    },
    {
      month: "Jun",
      like: 250,
    },
    {
      month: "Jul",
      like: 100,
    },
    {
      month: "Jul",
      like: 150,
    },
    {
      month: "Jul",
      like: 200,
    },
    {
      month: "Aug",
      like: 250,
    },
    {
      month: "Aug",
      like: 300,
    },
    {
      month: "Sep",
      like: 190,
    },
    {
      month: "Oct",
      like: 45,
    },
    {
      month: "Sep",
      like: 190,
    },
    {
      month: "Oct",
      like: 45,
    },
    {
      month: "Sep",
      like: 190,
    },
    {
      month: "Oct",
      like: 45,
    },
    {
      month: "Sep",
      like: 190,
    },
    {
      month: "Oct",
      like: 45,
    },
    {
      month: "Sep",
      like: 190,
    },
    {
      month: "Oct",
      like: 45,
    },
    {
      month: "Sep",
      like: 190,
    },
    {
      month: "Oct",
      like: 45,
    },
    {
      month: "Aug",
      like: 300,
    },
    {
      month: "Sep",
      like: 190,
    },
    {
      month: "Oct",
      like: 45,
    },
    {
      month: "Sep",
      like: 190,
    },
    {
      month: "Oct",
      like: 45,
    },
    {
      month: "Sep",
      like: 190,
    },
    {
      month: "Oct",
      like: 45,
    },
    {
      month: "Sep",
      like: 190,
    },
    {
      month: "Oct",
      like: 45,
    },
    {
      month: "Sep",
      like: 190,
    },
    {
      month: "Oct",
      like: 45,
    },
    {
      month: "Sep",
      like: 190,
    },
    {
      month: "Oct",
      like: 45,
    },
    {
      month: "Oct",
      like: 45,
    },
    {
      month: "Sep",
      like: 190,
    },
    {
      month: "Oct",
      like: 45,
    },
    {
      month: "Sep",
      like: 190,
    },
    {
      month: "Oct",
      like: 45,
    },
    {
      month: "Sep",
      like: 190,
    },
    {
      month: "Oct",
      like: 45,
    },
    {
      month: "Sep",
      like: 190,
    },
    {
      month: "Oct",
      like: 45,
    },
    {
      month: "Oct",
      like: 45,
    },
    {
      month: "Sep",
      like: 190,
    },
    {
      month: "Oct",
      like: 45,
    },
    {
      month: "Sep",
      like: 190,
    },
    {
      month: "Oct",
      like: 45,
    },
    {
      month: "Sep",
      like: 190,
    },
    {
      month: "Oct",
      like: 45,
    },
    {
      month: "Sep",
      like: 190,
    },
    {
      month: "Oct",
      like: 45,
    },
  ];
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
  useEffect(() => {
    const el = elRef.current;
    if (el) {
      const onWheel = (e) => {
        if (e.deltaY == 0) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY,
          behavior: "smooth",
        });
      };
      el.addEventListener("wheel", onWheel);
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, []);
  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[1440px] h-[1024px] relative">
        <div className="absolute top-[79px] left-[96px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[32px] tracking-[0] leading-[normal]">
          Logo
        </div>
        <div
          id="scrollhorigental"
          ref={elRef}
          className="absolute w-full mx-auto overflow-x-auto overflow-y-hidden min-h-[520px] top-[100px]"
        >
          {/* eslint-disable */}
          <div
            style={{
              width:
                likedata?.length > 20
                  ? `${110 + likedata?.length * 55}px`
                  : "1190px",
            }}
            className="absolute h-[40px] top-[427px] left-[120px] bg-[#d9d9d9]"
          />
          {likedata?.map((res, i) => {
            const isSameMonth = res.month === prevMonth;
            prevMonth = res.month;
            return (
              <>
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    width: `14px`,
                    height: `${15 + res?.like}px`,
                    bottom: "70px",
                    left: `${110 + (i + 1) * 55}px`,
                    background: "#d9d9d9",
                  }}
                />
                <div
                  onClick={() => setSelectedIndex(i)}
                  style={{
                    position: "absolute",
                    width: `40px`,
                    height: `40px`,
                    bottom: `${70 + res?.like}px`,
                    left: `${96 + (i + 1) * 55}px`,
                    background: "#fb1717",
                    borderRadius: "50px",
                    cursor: "pointer",
                  }}
                />
                {!isSameMonth && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: `10px`,
                      left: `${95 + (i + 1) * 55}px`,
                      color: "black",
                      fontSize: "10px",
                      zIndex: 99999999,
                    }}
                  >
                    {res?.month} 2023
                  </div>
                )}

                {selectedIndex == i && (
                  <div ref={dropdownRef}>
                    <div
                      style={{
                        position: "absolute",
                        width: `164px`,
                        height: `95px`,
                        bottom: `${130 + res?.like}px`,
                        left: `${40 + (i + 1) * 55}px`,
                        background: "#d9d9d9",
                        zIndex: 999999,
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: `${160 + res?.like}px`,
                        left: `${105 + (i + 1) * 55}px`,
                        color: "black",
                        fontSize: "16px",
                        zIndex: 99999999,
                      }}
                    >
                      title
                    </div>
                    <img
                      style={{
                        position: "absolute",
                        width: `26px`,
                        height: `34px`,
                        bottom: `${96 + res?.like}px`,
                        left: `${105 + (i + 1) * 55}px`,
                      }}
                      alt="Polygon"
                      src="https://i.ibb.co/vDZBHw1/Polygon-1.png"
                    />
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
