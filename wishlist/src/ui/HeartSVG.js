const HeartSVG = ({ width, height, fill, name }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      className={name}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.46447 2.25677C5.98563 0.581078 3.58796 0.581078 2.10913 2.25677C0.630291 3.93246 0.630291 6.64928 2.10913 8.32497L8 15L13.8909 8.32497C15.3697 6.64928 15.3697 3.93246 13.8909 2.25677C12.412 0.581078 10.0144 0.581078 8.53553 2.25677L8 2.86359L7.46447 2.25677Z"
        stroke="#2C2920"
        strokeLinejoin="bevel"
      />
    </svg>
  );
};

export default HeartSVG;
