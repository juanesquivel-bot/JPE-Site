import React from 'react'

const Button = ({ children, variant = 'primary', onClick, className = '', type = 'button', href }: any) => {
    const baseStyle = "px-8 py-3 text-xs tracking-[0.2em] uppercase transition-all duration-300 font-medium flex items-center justify-center gap-2 cursor-pointer";
    const variants = {
      primary: "bg-navy text-white hover:bg-navy-mid",
      sky: "bg-sky text-navy hover:bg-sky-dark hover:text-white",
      outline: "border border-navy text-navy hover:bg-navy hover:text-white",
      white: "bg-white text-navy hover:bg-ice",
      ghost: "text-navy hover:text-sky px-0 py-1"
    };
    const classes = `${baseStyle} ${variants[variant as keyof typeof variants]} ${className}`;
    if (href) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      );
    }
    return (
      <button type={type} onClick={onClick} className={classes}>
        {children}
      </button>
    );
}

export default Button
