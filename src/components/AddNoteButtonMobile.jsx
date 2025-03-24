import React from "react";

const AddNoteButtonMobile = () => {
  return (
    <a className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow hover:bg-primary/90 px-4 py-2 text-preset-4 fixed bottom-[80px] right-4 h-16 w-16 rounded-full bg-blue-500 lg:static lg:mb-4 lg:h-auto lg:w-full">
      <div bis_skin_checked="1">
        <img
          alt=""
          loading="lazy"
          width="24"
          height="24"
          decoding="async"
          data-nimg="1"
          src="/assets/icon-plus.svg"
        />
      </div>
    </a>
  );
};

export default AddNoteButtonMobile;
