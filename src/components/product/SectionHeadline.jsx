const SectionHeadline = ({ text, children }) => {
  return (
    <div>
      <h4 className="border-bottom text-uppercase font-releway fw-semibold border-2 border-theme headline-4 w-100 d-inline-block my-4">
        <span className="">{text}</span>
        {children}
      </h4>
    </div>
  );
};

export default SectionHeadline;
