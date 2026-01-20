const HamburgerIcon = ({ color } = '#EDEAE2') => {
  return (
    <svg
      width="22"
      height="16"
      viewBox="0 0 22 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1H20.25"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M1 7.875H20.25"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M1 14.75H20.25"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default HamburgerIcon;
