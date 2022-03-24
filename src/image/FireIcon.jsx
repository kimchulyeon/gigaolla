import React from "react";

const FireIcon = ({ color }) => {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.6665 12.0001C10.6665 10.5856 11.2284 9.22904 12.2286 8.22885C13.2288 7.22865 14.5853 6.66675 15.9998 6.66675V6.66675C17.4143 6.66675 18.7709 7.22865 19.7711 8.22885C20.7713 9.22904 21.3332 10.5856 21.3332 12.0001V28.0001C21.3332 28.3537 21.1927 28.6928 20.9426 28.9429C20.6926 29.1929 20.3535 29.3334 19.9998 29.3334H11.9998C11.6462 29.3334 11.3071 29.1929 11.057 28.9429C10.807 28.6928 10.6665 28.3537 10.6665 28.0001V12.0001Z"
        stroke={color}
        stroke-width="2"
        stroke-linejoin="round"
      />
      <path
        d="M16 16V22.6667"
        stroke={color}
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.3333 3.3335H19.3333V6.00016H13.3333V3.3335Z"
        stroke={color}
        stroke-width="2"
        stroke-linejoin="round"
      />
      <path
        d="M19.3333 3.33341L25.3333 2.66675V6.66675L19.3333 6.00008V3.33341Z"
        stroke={color}
        stroke-width="2"
        stroke-linejoin="round"
      />
      <path
        d="M13.3332 4.66686C11.3332 4.66686 8.33324 4.33353 6.66657 6.00019C5.05524 7.61153 5.33324 9.33353 5.33324 12.0002"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default FireIcon;
