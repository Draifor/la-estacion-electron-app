type Props = {
  className?: string
}

export default function WarningIcon({ className = 'w-6 h-6' }: Props): React.ReactNode {
  return (
    <svg
      fill="none"
      viewBox="0 0 27 27"
      className={`${className} inline-block`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.6 25.925H22.5C25.2 25.925 26.8 23.022 25.6 20.6195L16.6 3.80194C15.3 1.29934 11.8 1.29934 10.5 3.80194L1.5 20.6195C0.299997 23.022 1.9 25.925 4.6 25.925Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <path
        d="M13.9 18.0168H13.2C12.5 18.0168 12.6 17.4162 12.6 16.7154L11.9 9.30769C11.9 8.60696 12.5 8.00635 13.2 8.00635H13.9C14.6 8.00635 15.2 8.60696 15.2 9.30769L14.5 16.7154C14.5 17.4162 14.6 18.0168 13.9 18.0168Z"
        fill="currentColor"
      />
      <path
        d="M13.5 21.9208C14.4389 21.9208 15.2 21.3382 15.2 20.6195C15.2 19.9008 14.4389 19.3181 13.5 19.3181C12.5611 19.3181 11.8 19.9008 11.8 20.6195C11.8 21.3382 12.5611 21.9208 13.5 21.9208Z"
        fill="currentColor"
      />
    </svg>
  )
}
